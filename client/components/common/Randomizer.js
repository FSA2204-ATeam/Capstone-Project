// input should be whole array of available events
// should we do the filtering (preferences + sentiment analysis prior to passing in?)
// events can be part of state

// could we do filtering during the API call for events??

// Randomizer should set "currentEvent" and map component can display that
// _____________
// | event title |
// | type        |
// | info                         |
// | distance from user           | <-- optional tier 5?
// | google estimated travel time | <-- optional tier 5?
// | ACCEPT / DECLINE |
// --------------------

const events = [
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "6am to 3pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387870/1",
    address: "Media Lab - 776 Lorimer Street",
    eventLat: "40.7201776",
    eventLng: "-73.9496702",
    databaseId: 387870,
  },
  {
    name: "McCarren Adult Morning Basketball",
    shortDesc: "basketball",
    timePart: "6am to 8:45am",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/mccarren-adult-morning-basketball/388255/1",
    address: "Gymnasium - 776 Lorimer Street",
    eventLat: "40.7201776",
    eventLng: "-73.9496702",
    databaseId: 388255,
  },
  {
    name: "Cardio  Weight Room",
    shortDesc: "Open Access. cardio / weight room",
    timePart: "6:30am to 8:30pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/cardio--weight-room/387966/1",
    address: "Cardio Room - 501 Brielle Avenue",
    eventLat: "40.5918312",
    eventLng: "-74.1391991",
    databaseId: 387966,
  },
  {
    name: "Table Tennis Room",
    shortDesc: "Open Access",
    timePart: "6:30am to 8:30pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/table-tennis-room/388367/1",
    address: "Table Tennis Room - 501 Brielle Avenue",
    eventLat: "40.5918312",
    eventLng: "-74.1391991",
    databaseId: 388367,
  },
  {
    name: "Fitness Center",
    shortDesc: "Cardio and Weights",
    timePart: "7am to 10pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/fitness-center/388054/1",
    address: "Fitness Room - 1555 Linden Boulevard",
    eventLat: "40.65648119999999",
    eventLng: "-73.90282189999999",
    databaseId: 388054,
  },
  {
    name: "Fitness Room Open Access RH",
    shortDesc: "Open Access",
    timePart: "7am to 8:30pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/fitness-room-open-access-rh/388059/1",
    address: "Red Hook Recreation Center",
    eventLat: "40.6723955",
    eventLng: "-74.004087",
    databaseId: 388059,
  },
  {
    name: "Its My Park at Sunset Park",
    shortDesc:
      "Volunteer with Parent-Child Relationship Association to beautify Sunset Park.",
    timePart: "7am to 9am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/its-my-park-at-sunset-park/388104/1",
    address: "Sunset Park Recreation Center",
    eventLat: "40.6468857",
    eventLng: "-74.00203359999999",
    databaseId: 388104,
  },
  {
    name: "McCarren Beginners Weight Training",
    shortDesc: "weightroom, fitness, training, spotter",
    timePart: "7am to 8:30am",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/mccarren-beginners-weight-training/388262/1",
    address: "Strength Room - 776 Lorimer Street",
    eventLat: "40.7201776",
    eventLng: "-73.9496702",
    databaseId: 388262,
  },
  {
    name: "Ft Washington Greenmarket Tuesday",
    shortDesc: "Farmers Market",
    timePart: "8am to 6pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/ft-washington-greenmarket-tuesday/380134/1",
    address:
      " FT WASHINGTON AVENUE between WEST  168 STREET and WEST  169 STREET  Manhattan",
    eventLat: "40.8408407",
    eventLng: "-73.9396297",
    databaseId: 380134,
  },
  {
    name: "Lincoln Hospital Greenmarket Tuesday  Friday",
    shortDesc: "Farmers Market",
    timePart: "8am to 5pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/lincoln-hospital-greenmarket-tuesday--friday/379284/1",
    address: " EAST  149 STREET between PARK AVENUE and MORRIS AVENUE  Bronx",
    eventLat: "40.812119",
    eventLng: "-73.904099",
    databaseId: 379284,
  },
  {
    name: "Summertime Techies",
    shortDesc:
      "Explore fun, creative digital learning workshops with a focus on self-awareness and social activism.",
    timePart: "8am to 10am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/summertime-techies/388361/1",
    address: "Media Lab - 131-40 Fowler Ave.",
    eventLat: "40.7513963",
    eventLng: "-73.8339489",
    databaseId: 388361,
  },
  {
    name: "Total Body Fitness",
    shortDesc:
      "This fun low-impact full-body workout includes cardio, strength and balance exercises to improve your overall fitness.",
    timePart: "8am to 8:45am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/total-body-fitness/388389/1",
    address: "Dance Room - 1251 Prospect Place",
    eventLat: "40.6739246",
    eventLng: "-73.9349259",
    databaseId: 388389,
  },
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "9am to 1pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387882/1",
    address: "Media Lab - 430 W. 25th Street",
    eventLat: "40.74826849999999",
    eventLng: "-74.00206469999999",
    databaseId: 387882,
  },
  {
    name: "CityParks Everyday Play at Baisley Pond Park",
    shortDesc:
      "Everyday Play is a free, 5-day per week multi-sport program for kids ages 8-17. Students enjoy a rotating schedule of activities which typically...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-everyday-play-at-baisley-pond-park/387982/1",
    address: "Baisley Pond Park",
    eventLat: "40.6737751",
    eventLng: "-73.786025",
    databaseId: 387982,
  },
  {
    name: "CityParks Everyday Play at Williamsbridge Oval",
    shortDesc:
      "Everyday Play is a free, 5-day per week multi-sport program for kids ages 8-17. Students enjoy a rotating schedule of activities which typically...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-everyday-play-at-williamsbridge-oval/387983/1",
    address: "Williamsbridge Oval",
    eventLat: "40.8776938",
    eventLng: "-73.87771289999999",
    databaseId: 387983,
  },
  {
    name: "CItyParks Golf at Sunset Park",
    shortDesc:
      "Our summer beginner program transforms local neighborhood ball fields into driving ranges and practice greens to introduce the basic skills of the...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-golf-at-sunset-park/387959/1",
    address: "Sunset Park",
    eventLat: "40.65272",
    eventLng: "-74.00933479999999",
    databaseId: 387959,
  },
  {
    name: "CItyParks Golf at Van Cortlandt",
    shortDesc:
      "Our summer beginner program transforms local neighborhood ball fields into driving ranges and practice greens to introduce the basic skills of the...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-golf-at-van-cortlandt/387960/1",
    address:
      "Van Cortlandt Park - Broadway, Jerome Ave,City Line,Van Cortlandt Pk S",
    eventLat: "40.8972233",
    eventLng: "-73.88606679999999",
    databaseId: 387960,
  },
  {
    name: "CityParks Soccer at Beach 30th Street Playground",
    shortDesc:
      "Our summer beginner program teaches kids of all levels the basics of soccer through informal play and instruction.",
    timePart: "9am to 11am",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-soccer-at-beach-30th-street-playground/387985/1",
    address: "Beach 30th Street Playground",
    eventLat: "40.5925622",
    eventLng: "-73.7620586",
    databaseId: 387985,
  },
  {
    name: "CityParks Soccer at Corproal Thompson Park",
    shortDesc:
      "Our summer beginner program teaches kids of all levels the basics of soccer through informal play and instruction.",
    timePart: "9am to 11am",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-soccer-at-corproal-thompson-park/387986/1",
    address: "Cpl. Thompson Park",
    eventLat: "40.637932",
    eventLng: "-74.11885509999999",
    databaseId: 387986,
  },
  {
    name: "CityParks Soccer at Flushing Meadows Corona Park",
    shortDesc:
      "Our summer beginner program teaches kids of all levels the basics of soccer through informal play and instruction.",
    timePart: "9am to 11am",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-soccer-at-flushing-meadows-corona-park/387987/1",
    address: "Flushing Meadows Corona Park - Grand Central Pkwy, Van Wyck Exwy",
    eventLat: "40.7400275",
    eventLng: "-73.84069529999999",
    databaseId: 387987,
  },
  {
    name: "CityParks Tennis at Astoria Park",
    shortDesc:
      "Free beginner tennis instruction for children ages 6 - 17 on a first come, first serve basis. Our instructors use fun exercises and drills to help...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-tennis-at-astoria-park/387991/1",
    address:
      "Astoria Park - Tennis Courts - Tennis Courts 21st St & Hoyt Ave S",
    eventLat: "40.7756292",
    eventLng: "-73.9243975",
    databaseId: 387991,
  },
  {
    name: "CityParks Tennis at Highland Park",
    shortDesc:
      "Free beginner tennis instruction for children ages 6 - 17 on a first come, first serve basis. Our instructors use fun exercises and drills to help...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-tennis-at-highland-park/387998/1",
    address: "Highland Park Tennis Courts",
    eventLat: "40.6838535",
    eventLng: "-73.88790569999999",
    databaseId: 387998,
  },
  {
    name: "CityParks Tennis at Leif Ericson Park",
    shortDesc:
      "Free beginner tennis instruction for children ages 6 - 17 on a first come, first serve basis. Our instructors use fun exercises and drills to help...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-tennis-at-leif-ericson-park/388003/1",
    address: "Leif Ericson Park",
    eventLat: "40.6372953",
    eventLng: "-74.0229794",
    databaseId: 388003,
  },
  {
    name: "CityParks Tennis at Silver Lake Park",
    shortDesc:
      "Free beginner tennis instruction for children ages 6 - 17 on a first come, first serve basis. Our instructors use fun exercises and drills to help...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-tennis-at-silver-lake-park/388011/1",
    address: "Silver Lake Park",
    eventLat: "40.6245495",
    eventLng: "-74.09169439999999",
    databaseId: 388011,
  },
  {
    name: "CityParks Tennis at Van Cortlandt Park",
    shortDesc:
      "Free beginner tennis instruction for children ages 6 - 17 on a first come, first serve basis. Our instructors use fun exercises and drills to help...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-tennis-at-van-cortlandt-park/388015/1",
    address:
      "Van Cortlandt Park - Broadway, Jerome Ave,City Line,Van Cortlandt Pk S",
    eventLat: "40.8972233",
    eventLng: "-73.88606679999999",
    databaseId: 388015,
  },
  {
    name: "CityParks Track and Field at Kaiser Park",
    shortDesc:
      "The CityParks Track & Field program provides an introduction to the simple and beautiful sport of track and field and gives New York City kids the",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-track-and-field-at-kaiser-park/388023/1",
    address: "Kaiser Park - Neptune Avenue and Bayview Avenue",
    eventLat: "40.5790202",
    eventLng: "-73.99565570000001",
    databaseId: 388023,
  },
  {
    name: "CityParks Track and Field at Williamsbridge Oval Park",
    shortDesc:
      "The CityParks Track & Field program provides an introduction to the simple and beautiful sport of track and field and gives New York City kids the",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-track-and-field-at-williamsbridge-oval-park/388027/1",
    address: "Williamsbridge Oval",
    eventLat: "40.8776938",
    eventLng: "-73.87771289999999",
    databaseId: 388027,
  },
  {
    name: "Mommy  Me Exercise",
    shortDesc: "Tots program, toddlers, exercise",
    timePart: "9am to 9:35am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/mommy--me-exercise/388275/1",
    address: "Gymnasium - 776 Lorimer Street",
    eventLat: "40.7201776",
    eventLng: "-73.9496702",
    databaseId: 388275,
  },
  {
    name: "Open Access",
    shortDesc: "Daily attendance",
    timePart: "9am to 5pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/open-access/388291/1",
    address:
      "Fort Hamilton Senior Recreation Center - 9941 Fort Hamilton Pkwy, Brooklyn, NY 11209",
    eventLat: "40.6118688",
    eventLng: "-74.0317395",
    databaseId: 388291,
  },
  {
    name: "Pitch in to Pick up",
    shortDesc:
      "Your efforts not only protect wildlife and the rest of the Bronx River ecosystem, but they also help us identify the sources of trash so we can...",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/pitch-in-to-pick-up/388307/1",
    address: "Bronx River House - 1490 Sheridan Blvd, Bronx, NY 10459",
    eventLat: "40.8327505",
    eventLng: "-73.88291719999999",
    databaseId: 388307,
  },
  {
    name: "Quilting",
    shortDesc:
      "Quilting is a beautifully useful art to learn and it is fun to do with others.",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/quilting/388317/1",
    address: "Multi-Use Room A - 9941 Fort Hamilton Parkway",
    eventLat: "40.611862",
    eventLng: "-74.031745",
    databaseId: 388317,
  },
  {
    name: "Summer Camp Sports Experience",
    shortDesc: "Summer Camp will learn different sports",
    timePart: "9am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/summer-camp-sports-experience/388354/1",
    address: "Gymnasium - 35 West 134th Street",
    eventLat: "40.8128918",
    eventLng: "-73.9394264",
    databaseId: 388354,
  },
  {
    name: "CityParks Track and Field at Astoria Park",
    shortDesc:
      "The CityParks Track & Field program provides an introduction to the simple and beautiful sport of track and field and gives New York City kids the",
    timePart: "9:30am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-track-and-field-at-astoria-park/388018/1",
    address: "Astoria Park",
    eventLat: "40.7785364",
    eventLng: "-73.92283359999999",
    databaseId: 388018,
  },
  {
    name: "CityParks Track and Field at Detective Keith Williams Park",
    shortDesc:
      "The CityParks Track & Field program provides an introduction to the simple and beautiful sport of track and field and gives New York City kids the",
    timePart: "9:30am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-track-and-field-at-detective-keith-williams-park/388021/1",
    address: "Detective Keith Williams Park",
    eventLat: "40.7028871",
    eventLng: "-73.78445309999999",
    databaseId: 388021,
  },
  {
    name: "CityParks Track and Field at Thomas Jefferson Park",
    shortDesc:
      "The CityParks Track & Field program provides an introduction to the simple and beautiful sport of track and field and gives New York City kids the",
    timePart: "9:30am to 12pm",
    datePart: "Jul 5",
    permalink:
      "http://www1.nyc.gov/events/cityparks-track-and-field-at-thomas-jefferson-park/388026/1",
    address: "Thomas Jefferson Park",
    eventLat: "40.7933578",
    eventLng: "-73.9352341",
    databaseId: 388026,
  },
  {
    name: "Oil Painting",
    shortDesc: "Grab a brush and paint your favorite work.",
    timePart: "9:30am to 12pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/oil-painting/388289/1",
    address: "Multi-Use Room B - 9941 Fort Hamilton Parkway",
    eventLat: "40.611862",
    eventLng: "-74.031745",
    databaseId: 388289,
  },
  {
    name: "Building with Tots",
    shortDesc: "Tots building imaginary.",
    timePart: "9:45am to 10:30am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/building-with-tots/387951/1",
    address: "Gymnasium - 776 Lorimer Street",
    eventLat: "40.7201776",
    eventLng: "-73.9496702",
    databaseId: 387951,
  },
  {
    name: "30 In 30 Out",
    shortDesc:
      "Fitness class for beginners and those looking for low impact workout.",
    timePart: "10am to 10:30am",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/30-in-30-out/387859/1",
    address: "Dance Room - 348 East 54 Street",
    eventLat: "40.7564652",
    eventLng: "-73.96514619999999",
    databaseId: 387859,
  },
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "10am to 6pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387908/1",
    address: "Media Lab - 1527 Jesup Avenue",
    eventLat: "40.8440083",
    eventLng: "-73.9189894",
    databaseId: 387908,
  },
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "10am to 3pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387907/1",
    address: "Media Lab A - 1251 Prospect Place",
    eventLat: "40.6739246",
    eventLng: "-73.9349259",
    databaseId: 387907,
  },
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "10am to 2pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387906/1",
    address: "Media Lab - 4200 7th Avenue",
    eventLat: "40.7517748",
    eventLng: "-73.9900696",
    databaseId: 387906,
  },
  {
    name: "Adult Open Access",
    shortDesc: "Computers are available for use by all members 18 and older.",
    timePart: "10am to 1pm",
    datePart: "Jul 5",
    permalink: "http://www1.nyc.gov/events/adult-open-access/387904/1",
    address: "Media Lab - 35 West 134th Street",
    eventLat: "40.8128918",
    eventLng: "-73.9394264",
    databaseId: 387904,
  },
];

const Randomizer = (dataset) => {
  // for purposes of this test, will create an array of seed events  to randomize

  let numOfEvents = dataset.length;
  let random = Math.floor(Math.random() * numOfEvents);

  return dataset[random];
};

console.log(Randomizer(events));

module.exports = Randomizer;
