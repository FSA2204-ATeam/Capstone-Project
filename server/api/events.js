const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  let addressUrl =
    "https://api.nyc.gov/calendar/search?startDate=06/30/2022 12:00 AM&endDate=07/01/2022 12:00 AM&pageNumber=";
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
        .map((evt) => events.push(evt));
    } catch (error) {
      next(error);
    }
  }
  console.log(events.length);
  res.json(events);
});

module.exports = router;
