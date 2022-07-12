const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event },
} = require("../db");
const User = require("../db/models/User");
const formatDate = require("../../script/formatDate");
const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  let startDate = formatDate(0);
  let endDate = formatDate(1);

  console.log(`Looking for Events between ${startDate} and ${endDate}!`);

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
            databaseId: evt.id.toString(),
          })
        );
    } catch (error) {
      next(error);
    }
  }
  console.log(`${events.length} events found!`);
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
    console.log("PARAMS", req.params);
    const events = await Event.findAll({
      where: { id: req.params.userId },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.get("/myevents", requireToken, async (req, res, next) => {
  try {
    console.log("DID I MAKE IT????");
    console.log("REQ BODY", req.body);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
