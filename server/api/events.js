const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event },
} = require("../db");
const User = require("../db/models/User");
const formatDate = require("../../script/formatDate");
const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
const { Op } = require("sequelize");

// Gets event list from NYC API
router.get("/", async (req, res, next) => {
  let [searchStart, searchEnd, startDate, endDate] = formatDate(1);

  console.log("searchStart: ", searchStart);
  console.log("searchEnd: ", searchEnd);
  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  let addressUrl = `https://api.nyc.gov/calendar/search?startDate=${startDate} 12:00 AM&endDate=${endDate} 12:00 AM&pageNumber=`;
  let events = [];

  try {
    const result = await Event.findAll({
      where: {
        startDate: {
          [Op.and]: [{ [Op.gte]: searchStart }, { [Op.lte]: searchEnd }],
        },
      },
    });
  } catch (err) {
    next(err);
  }

  // try {
  // } catch (error) {}

  // for (let pgno = 1; pgno <= 5; pgno++) {
  //   try {
  //     const { data } = await axios.get(`${addressUrl}${pgno}`, {
  //       headers: {
  //         "Cache-Control": "no-cache",
  //         "Ocp-Apim-Subscription-Key": `${process.env.NYC_EVENTS_API_KEY}`,
  //       },
  //     });

  //     data.items
  //       .filter((e) => e.geometry !== undefined)
  //       .map((evt) =>
  //         events.push({
  //           name: evt.name,
  //           shortDesc: evt.shortDesc,
  //           startDate: evt.startDate,
  //           endDate: evt.endDate,
  //           permalink: evt.permalink,
  //           address: evt.address,
  //           eventLat: evt.geometry[0].lat,
  //           eventLng: evt.geometry[0].lng,
  //           databaseId: evt.id.toString(),
  //           source: "NYC API ",
  //         })
  //       );

  //     const { creationResult } = await Event.bulkCreate(events, {
  //       ignoreDuplicates: true,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // res.send(events);
});

// feeling wild get route
// axios get  our own database pull events from now to the future

module.exports = router;
