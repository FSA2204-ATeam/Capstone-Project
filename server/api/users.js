const router = require('express').Router();

const {
  models: { User, UserPreferences },
} = require('../db');

const { requireToken, isAdmin } = require('../api/gateKeepingMiddleware');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//    UPDATE USER PROFILE
router.put('/updateProfile', requireToken, async (req, res, next) => {
  console.log('REQ.BODY ===========>', req.body);
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

//    FETCH USER PREFERENCES, IF NO EXIST, CREATE
router.get('/preferences', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const userPrefs = await User.findByPk(user.id, {
      include: UserPreferences,
    });
    //IF NO USER PREFS FOUND, CREATE BELOW
    if (!userPrefs.userPreference) {
      const createdUserPrefs = await UserPreferences.create({
        userId: user.id,
      });
      res.send(createdUserPrefs);
      // SEND USER PREFERENCES ONLY
    } else {
      res.send(userPrefs.userPreference);
    }
  } catch (error) {
    next(error);
  }
});

//    UPDATE USER PREFERENCES, IF NO EXIST, CREATE
