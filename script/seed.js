"use strict";

const { Sequelize } = require("sequelize");
const axios = require("axios");

const {
  db,
  models: { User, Event, UsersEvents, UserPreferences },
} = require("../server/db");

const usersSeed = require("./user_data.json");
const eventsSeed = require("./event_data.json");

async function seed() {
  await db.sync({ force: true });
  // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await User.bulkCreate(usersSeed);

  // Creating events
  // const events = await Event.bulkCreate(eventsSeed);

  //  create connections
  // // const crossover = await Promise.all([
  //   users[0].addEvents(events[90]),
  //   users[0].addEvents(events[21]),
  //   users[0].addEvents(events[52]),
  //   users[0].addEvents(events[34]),
  //   users[0].addEvents(events[14]),
  //   users[0].addEvents(events[48]),
  //   users[0].addEvents(events[10]),
  //   users[0].addEvents(events[42]),
  //   users[0].addEvents(events[62]),
  //   users[0].addEvents(events[0]),
  //   users[1].addEvents(events[67]),
  //   users[1].addEvents(events[88]),
  //   users[1].addEvents(events[61]),
  //   users[1].addEvents(events[47]),
  //   users[1].addEvents(events[128]),
  //   users[1].addEvents(events[124]),
  //   users[1].addEvents(events[87]),
  //   users[1].addEvents(events[63]),
  //   users[1].addEvents(events[64]),
  //   users[1].addEvents(events[122]),
  //   users[2].addEvents(events[129]),
  //   users[2].addEvents(events[11]),
  //   users[2].addEvents(events[40]),
  //   users[2].addEvents(events[60]),
  //   users[2].addEvents(events[52]),
  //   users[2].addEvents(events[18]),
  //   users[2].addEvents(events[3]),
  //   users[2].addEvents(events[47]),
  //   users[2].addEvents(events[24]),
  //   users[2].addEvents(events[68]),
  //   users[3].addEvents(events[1]),
  //   users[3].addEvents(events[65]),
  //   users[3].addEvents(events[74]),
  //   users[3].addEvents(events[12]),
  //   users[3].addEvents(events[44]),
  //   users[3].addEvents(events[137]),
  //   users[3].addEvents(events[107]),
  //   users[3].addEvents(events[30]),
  //   users[3].addEvents(events[95]),
  //   users[3].addEvents(events[14]),
  //   users[4].addEvents(events[46]),
  //   users[4].addEvents(events[110]),
  //   users[4].addEvents(events[138]),
  //   users[4].addEvents(events[72]),
  //   users[4].addEvents(events[118]),
  //   users[4].addEvents(events[69]),
  //   users[4].addEvents(events[126]),
  //   users[4].addEvents(events[34]),
  //   users[4].addEvents(events[17]),
  //   users[4].addEvents(events[23]),
  //   users[5].addEvents(events[107]),
  //   users[5].addEvents(events[28]),
  //   users[5].addEvents(events[34]),
  //   users[5].addEvents(events[11]),
  //   users[5].addEvents(events[22]),
  //   users[5].addEvents(events[94]),
  //   users[5].addEvents(events[32]),
  //   users[5].addEvents(events[15]),
  //   users[5].addEvents(events[14]),
  //   users[5].addEvents(events[89]),
  // ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${events.length} events`);
  console.log(`seeded ${crossover.length} crossover(s)`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
