const { Sequelize, Op } = require("sequelize");
const db = require("../db");

const UsersEvents = db.define("users_events", {
  attended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  review: {
    type: Sequelize.STRING,
  },
  sentimentScore: {
    type: Sequelize.FLOAT,
  },
  sentimentLabel: {
    type: Sequelize.STRING,
  },
});

module.exports = UsersEvents;
