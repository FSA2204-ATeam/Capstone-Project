"use strict";

const {
  db,
  models: { User, Event, UsersEvents, UserPreferences },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const events = await Promise.all([
    Event.create({
      name: "97 Street Greenmarket Friday",
      shortDesc: "Farmers Market",
      timePart: "8am to 5pm",
      datePart: "Jul 1",
      permalink:
        "http://www1.nyc.gov/events/97-street-greenmarket-friday/379910/1",
      address:
        " WEST   97 STREET between COLUMBUS AVENUE and AMSTERDAM AVENUE  Manhattan",
      eventLat: "40.8134463",
      eventLng: "-73.9562105",
    }),
  ]);

  //await events[0].setUsers([users[0], users[1]]);

  console.log(`seeded ${users.length} users`);
  //console.log(`seeded ${events.length} events`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    // events: {
    //   testEvent1: events[0],
    // },
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
