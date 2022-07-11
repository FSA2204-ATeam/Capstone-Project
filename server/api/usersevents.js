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

router.put("/", requireToken, async (req, res, next) => {
  try {
    const event = await Event.update(
      {
        totalGuests: req.body.totalGuests,
      },
      { where: { id: req.body.id } }
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/", requireToken, async (req, res, next) => {
  try {
    const removedRSVP = await UsersEvents.findOne({
      where: {
        userId: req.body.userId,
        eventId: req.body.eventId,
      },
    });
    await removedRSVP.destroy();
    res.json(removedRSVP);
  } catch (error) {
    next(error);
  }
});

router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const data = await User.findByPk(user.dataValues.id, {
      include: [Event],
    });
    res.json(data.dataValues.events);
  } catch (error) {
    next(error);
  }
});
