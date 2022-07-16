const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event, UsersEvents },
} = require("../db");
const User = require("../db/models/User");
const formatDate = require("../../script/formatDate");

const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  let [searchStart, searchEnd, startDate, endDate] = formatDate(5);

  let addressUrl = `https://api.nyc.gov/calendar/search?startDate=${startDate} 12:00 AM&endDate=${endDate} 12:00 AM&pageNumber=`;
  let events = [];

  try {
    let dbEvents = await Event.findAll({
      where: {
        startDate: {
          [Op.gte]: searchStart,
        },
      },
    });

    // received events from database
    // if statement below checks to see if any events in search period is from
    // NYC API SOURCE
    // if less than 10 exist, an api call to NYC is executed and added to the database
    // and also to the events array

    if (
      dbEvents.filter((event) => {
        event.dataValues.source !== null;
      }).length <= 5
    ) {
      for (let pgNo = 1; pgNo <= 5; pgNo++) {
        const { data } = await axios.get(`${addressUrl}${pgNo}`, {
          headers: {
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": `${process.env.NYC_EVENTS_API_KEY}`,
          },
        });

        data.items
          .filter((e) => e.geometry !== undefined)
          .map((evt) =>
            events.push({
              name: evt.name,
              shortDesc: evt.shortDesc,
              startDate: evt.startDate,
              endDate: evt.endDate,
              permalink: evt.permalink,
              address: evt.address,
              eventLat: evt.geometry[0].lat,
              eventLng: evt.geometry[0].lng,
              databaseId: evt.id.toString(),
              source: "NYC API",
            })
          );
      }
      await Event.bulkCreate(events, {
        ignoreDuplicates: true,
      });

      const updatedEvents = await Event.findAll({
        where: {
          startDate: {
            [Op.gte]: searchStart,
          },
        },
      });

      res.send(updatedEvents);
    } else res.send(dbEvents);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const newEvent = await Event.create(req.body);
    await newEvent.setUsers(user);
    await UsersEvents.update(
      { host: true },
      { where: { eventId: newEvent.id, userId: user.id } }
    );

    // can return a custom status to trigger user acknowledgement?
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("Updated Req.body", req.body);
    const updated = await Event.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    console.log("did I update", updated);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
