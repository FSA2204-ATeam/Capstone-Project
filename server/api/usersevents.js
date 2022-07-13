const router = require('express').Router();

const {
  models: { Event, User, UsersEvents },
} = require('../db');

const { requireToken, isAdmin } = require('../api/gateKeepingMiddleware');
module.exports = router;

//NEW USER CREATED EVENT ROUTE (CHANGE THIS TO BE CREATE EVENT, CREATE NEW ROUTE FOR RSVP ASSOCIATION)
router.post('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const [newEvent, created] = await Event.findOrCreate({
      where: req.body,
      defaults: req.body,
    });

    await newEvent.setUsers(user); ///set value of host to true
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

//RSVP ROUTE (ADDS ASSOCIATION WHEN USER RSVPs)
router.put('/', requireToken, async (req, res, next) => {
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
    console.log('API results for reviews', data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
