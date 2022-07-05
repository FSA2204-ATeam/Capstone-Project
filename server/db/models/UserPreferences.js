const { Sequelize, Op } = require('sequelize');
const db = require('../db');

const UserPreferences = db.define('userPreferences', {
  Art: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  Music: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  Food: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserPreferences;
