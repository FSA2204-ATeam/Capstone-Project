const { Sequelize, Op } = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  eventLat: {
    type: Sequelize.INTEGER,
  },
  eventLng: {
    type: Sequelize.INTEGER,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.TIME,
  },
  date: {
    type: Sequelize.DATE,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalGuests: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Event;
