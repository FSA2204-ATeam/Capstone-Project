const router = require("express").Router();
const axios = require("axios");
const {
  models: { Event, User, UsersEvents },
} = require("../db");

const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
module.exports = router;

router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const [newEvent, created] = await Event.findOrCreate({
      where: { databaseId: req.body.databaseId },
      defaults: req.body,
    });
    await newEvent.setUsers(user);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const data = await UsersEvents.findAll({
      where: {
        userId: user.dataValues.id,
      },
    });
    //   include: { model: Event, where: { eventId: { $col: "id" } } },
    // });
    console.log("Associations -->", data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
