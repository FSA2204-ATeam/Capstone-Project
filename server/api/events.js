const router = require("express").Router();
const axios = require("axios");

const formatDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

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
          })
        );
    } catch (error) {
      next(error);
    }
  }
  console.log(events.length);
  res.json(events);
});

module.exports = router;
