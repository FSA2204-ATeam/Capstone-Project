const db = require("./db");

const User = require("./models/User");

const Event = require("./models/Event");

const UsersEvents = require("./models/UsersEvents");

User.belongsToMany(Event, { through: UsersEvents });
Event.belongsToMany(User, { through: UsersEvents });

module.exports = {
  db,
  models: {
    User,
    Event,
    UsersEvents,
  },
};
