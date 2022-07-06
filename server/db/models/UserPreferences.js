const { Sequelize, Op } = require('sequelize');
const db = require('../db');

const UserPreferences = db.define('userPreferences', {
  CAT_Art: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  CAT_Music: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  CAT_Food: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserPreferences;
