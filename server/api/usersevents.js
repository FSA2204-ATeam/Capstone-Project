const router = require('express').Router();

const {
  models: { Event, User, UsersEvents },
} = require('../db');

const { requireToken, isAdmin } = require('../api/gateKeepingMiddleware');

module.exports = router;

router.post('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const event = await Event.findOne({
      where: req.body,
    });
    await event.setUsers(user);
    event.totalGuests++;
    res.json(event);
  } catch (error) {
    next(error);
  }
});
router.put('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const event = await Event.findOne({
      where: { id: req.body.id },
    });
    await Event.update(
      {
        totalGuests: req.body.totalGuests,
      },
      { where: { id: event.id } }
    );

    const data = await User.findByPk(user.dataValues.id, {
      include: [Event],
    });

    res.json(data.dataValues.events);
  } catch (error) {
    next(error);
  }
});

router.delete('/', requireToken, async (req, res, next) => {
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

router.get('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const data = await User.findByPk(user.dataValues.id, {
      include: [Event],
    });
    //console.log("EVENTS & ASSSOCIATIONS", data);
    res.json(data.dataValues.events);
  } catch (error) {
    next(error);
  }
});

router.get('/userReviews', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const data = await UsersEvents.findAll({
      where: {
        userId: user.id,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});
