const db = require('./db');
const User = require('./models/User');
const UserPreferences = require('./models/UserPreferences');
const Event = require('./models/Event');
const UsersEvents = require('./models/UsersEvents');

User.belongsToMany(Event, { through: UsersEvents });
Event.belongsToMany(User, { through: UsersEvents });
UserPreferences.belongsTo(User);
User.hasOne(UserPreferences);

module.exports = {
  db,
  models: {
    UserPreferences,
    User,
    Event,
    UsersEvents,
  },
};
