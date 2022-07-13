const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event },
} = require("../db");
const User = require("../db/models/User");
const formatDate = require("../../script/formatDate");
const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  let [searchStart, searchEnd, startDate, endDate] = formatDate(1);

  let addressUrl = `https://api.nyc.gov/calendar/search?startDate=${startDate} 12:00 AM&endDate=${endDate} 12:00 AM&pageNumber=`;
  let events = [];

  console.log(`Searching for events between ${startDate} and ${endDate}`);
  try {
    let dbEvents = await Event.findAll({
      where: {
        startDate: {
          [Op.and]: [{ [Op.gte]: searchStart }, { [Op.lte]: searchEnd }],
        },
      },
    });

    // received events from database
    // if statement below checks to see if any events in search period is from
    // NYC API SOURCE
    // if none exist, an api call to NYC is executed and added to the database
    // and also to the events array

    console.log(
      "dbEvents.length before filter: ",
      dbEvents.length,
      "dbEvents.length after filter",
      dbEvents.filter((event) => event.dataValues.source !== null).length
    );

    if (
      dbEvents.filter((event) => {
        event.dataValues.source !== null;
      }).length === 0
    ) {
      for (let pgno = 1; pgno <= 5; pgno++) {
        const { data } = await axios.get(`${addressUrl}${pgno}`, {
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

        const { creationResult } = await Event.bulkCreate(events, {
          ignoreDuplicates: true,
        });
      }
      events.push(...dbEvents);
    }
  } catch (error) {
    next(error);
  }

  res.send(events);
});

module.exports = router;
