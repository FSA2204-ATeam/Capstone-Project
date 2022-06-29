const router = require('express').Router();
const { models: { User }} = require('../db');
const { requireToken, isAdmin } = require('../api/gateKeepingMiddleware');
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

