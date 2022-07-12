const { Sequelize, Op } = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  shortDesc: {
    type: Sequelize.STRING,
  },
  startDate: {
    type: Sequelize.DATE,
  },
  endDate: {
    type: Sequelize.DATE,
  },
  permalink: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  eventLat: {
    type: Sequelize.FLOAT,
  },
  eventLng: {
    type: Sequelize.FLOAT,
  },
  totalGuests: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  databaseId: {
    type: Sequelize.STRING,
    unique: true,

    validate: {
      isString() {
        if (typeof this.databaseId !== "string") this.databaseId.toString();
      },
    },
  },
  category: {
    type: Sequelize.STRING,
  },
});

module.exports = Event;
