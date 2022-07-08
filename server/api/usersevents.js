const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event, User, UsersEvents },
} = require("../db");

const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
module.exports = router;

router.post("/", requireToken, async (req, res, next) => {
  console.log("REQ.BODY ---", req.body);
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("USER", user);
    const [newEvent, created] = await Event.findOrCreate({
      where: { databaseId: req.body.databaseId },
      defaults: req.body,
    });
    console.log("newEvent", newEvent);
    await newEvent.setUsers(user);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});
