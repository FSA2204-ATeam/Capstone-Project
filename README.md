# Urban Safari

Never know where to go? Need to boost your guestlist numbers?

URBAN SAFARI is a roulette style guide to the wildlife of NYC. Using proximity-based mapping, event listing APIs and community sourced parties, let us help you find your way to the outback of your imagination.

Feeling Wild? Sign up now to RSVP to, or create, an upcoming event! Navigate to 'My Events' to view details and submit reviews. Our API will run a sentiment analysis of your feedback and better direct you to future events that match your preferences!

## Team Members

We are a team of urban explorers from the four corners of the United States. As part of our academic experience at Fullstack Academy, we have collaborated on providing NYC residents with an app to inspire civic and community engagement.

- Alessandro De Mitri [GitHub](https://github.com/Alessandro-DM)
- Walker Fisher
- Erion Xeneli
- Tim Brandau [GitHub](https://github.com/tacticalbison)

## Start

Databases must be created:
createdb urban-safari

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

### Features

- The GoogleMaps API was utilized to create the map layer of this application
- Urban Safari uses IBM Watson sentiment learning (through the natural language understanding SDK) to evaluate reviews entered by the user
- Voice to Text functionality is included for review entry
- API events are sourced from the free NYC Events API. Additional information can be found [here](https://api-portal.nyc.gov/api-details#api=event-calendar&operation=categories)
- Material UI was extensively used to stylize the application

---

# Additional Description

Urban Safari is a roulette style guide to the wildlife of NYC. Using proximity-based mapping, event listing APIs and community sourced parties, this guide application provides users with recommended events. These events can be weighted by category and the randomizer is capable of utilizing the sentiment analysis curated from reviews in conjunction with users' preferences to serve up events that fit their tastes.

Urban Safari was built on a tech stack that includes: dbdiagram.io, Figma, Trello, GitHub, Slack, Visual Studio Code, NodeJS, PostgresSQL, Express, Sequelize, React-Redux, Material UI, HTML5 and CSS. Third party API information utilized within this project include: GoogleMaps, New York City Events, Mozilla's Web Speech, and IBM Watson Natural Language Understanding.
We utilized a combination of MUI and Google Maps to create a single page application accessible by both mobile and desktop browsers.

Urban Safari was created from a brainstorm session that focused on delivering a unique product. Our team took great interest in collaborating to design specialty logic structures and successfully implemented data extraction and switch cases for use in our single page application. Our most valuable learning lessons were in the research stage of our production pipeline; during our proof of concept build out. For API calls, we implemented individual and paired programming to integrate them into the final product.

This product was designed remotely and our team is very proud of overcoming the challenges associated with online work environments.
