const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event },
} = require("../db");
const User = require("../db/models/User");
const formatDate = require("../../script/formatDate");

router.get("/", async (req, res, next) => {
  let startDate = formatDate();
  let endDate = formatDate(1);

  console.log("Start", startDate);
  console.log("End", endDate);

  let addressUrl = `https://api.nyc.gov/calendar/search?startDate=${startDate} 12:00 AM&endDate=${endDate} 12:00 AM&pageNumber=`;
  let events = [];

  for (let pgno = 1; pgno <= 5; pgno++) {
    try {
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
            timePart: evt.timePart,
            datePart: evt.datePart,
            permalink: evt.permalink,
            address: evt.address,
            eventLat: evt.geometry[0].lat,
            eventLng: evt.geometry[0].lng,
            databaseId: evt.id,
          })
        );
    } catch (error) {
      next(error);
    }
  }
  console.log(events.length);
  res.json(events);
});

router.post("/:userId", async (req, res, next) => {
  try {
    const [newEvent, created] = await Event.findOrCreate({
      where: {
        name: "97 Street Greenmarket Friday",
        shortDesc: "Farmers Market",
        timePart: "8am to 5pm",
        datePart: "Jul 1",
        permalink:
          "http://www1.nyc.gov/events/97-street-greenmarket-friday/379910/1",
        address:
          " WEST   97 STREET between COLUMBUS AVENUE and AMSTERDAM AVENUE  Manhattan",
        eventLat: "40.8134463",
        eventLng: "-73.9562105",
      },
    });
    const user = await User.findByPk(req.params.userId);
    await newEvent.setUsers(user);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: { id: req.params.userId },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
