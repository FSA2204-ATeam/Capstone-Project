import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import uniqueRandomizer from "../../script/uniqueRandomizer";

const dummyEvents = [
  {
    name: "Primary Election - Last Day to Postmark Voter Registration Application",
    shortDesc:
      "July 29, 2022 is the last day to postmark a voter registration application to vote in the 2022 Primary Election on August 23, 2022.",
    startDate: "2022-07-29T09:00:00.000-04:00",
    endDate: "2022-07-29T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/primary-election---last-day-to-postmark-voter-registration-application/171441/1",
    address: "Citywide",
    eventLat: "40.8556079",
    eventLng: "-73.8398387",
    databaseId: "171441",
    source: "NYC API",
  },
  {
    name: "Primary Election - Last Day to Register In Person to Vote",
    shortDesc:
      "July 29, 2022 is the last day to register in-person to vote in the 2022 Primary Election on August 23, 2022.",
    startDate: "2022-07-29T09:00:00.000-04:00",
    endDate: "2022-07-29T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/primary-election---last-day-to-register-in-person-to-vote/171444/1",
    address: "32 Broadway 7th Floor",
    eventLat: "40.70587150000001",
    eventLng: "-74.0129819",
    databaseId: "171444",
    source: "NYC API",
  },
  {
    name: "Primary Election - Change of Address",
    shortDesc:
      "Primary Election occurs August 23, 2022. Change of address received by August 3, 2022 for the 2022 Primary Election must be processed.",
    startDate: "2022-08-03T09:00:00.000-04:00",
    endDate: "2022-08-03T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/primary-election---change-of-address/171438/1",
    address: "Citywide",
    eventLat: "40.8556079",
    eventLng: "-73.8398387",
    databaseId: "171438",
    source: "NYC API",
  },
  {
    name: "Primary Election - Last Day to Postmark an Application for an Absentee Ballot",
    shortDesc:
      "August 8th is the last day to postmark an absentee ballot application to vote in the 2022 Primary Election on August 23, 2022.",
    startDate: "2022-08-08T09:00:00.000-04:00",
    endDate: "2022-08-08T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/primary-election---last-day-to-postmark-an-application-for-an-absentee-ballot/171442/1",
    address: "Citywide",
    eventLat: "40.8556079",
    eventLng: "-73.8398387",
    databaseId: "171442",
    source: "NYC API",
  },
  {
    name: "57 Street Wednesday  Saturday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T08:00:00.000-04:00",
    endDate: "2022-07-13T18:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/57-street-wednesday--saturday/380012/1",
    address:
      " 10 AVENUE between WEST   57 STREET and WEST   58 STREET  Manhattan",
    eventLat: "40.7830603",
    eventLng: "-73.9712488",
    databaseId: "380012",
    source: "NYC API",
  },
  {
    name: "Mount Sinai Greenmarket Wednesday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T08:00:00.000-04:00",
    endDate: "2022-07-13T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/mount-sinai-greenmarket-wednesday/379220/1",
    address:
      " MADISON AVENUE between EAST   98 STREET and EAST   99 STREET  Manhattan",
    eventLat: "40.7421612",
    eventLng: "-73.9870435",
    databaseId: "379220",
    source: "NYC API",
  },
  {
    name: "Union Square Greenmarket Monday, Wednesday, Friday and Saturday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T08:00:00.000-04:00",
    endDate: "2022-07-13T19:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/union-square-greenmarket-monday-wednesday-friday-and-saturday/378679/1",
    address:
      " UNION SQUARE WEST between EAST   14 STREET and EAST   15 STREET  Manhattan",
    eventLat: "40.7358984",
    eventLng: "-73.9912281",
    databaseId: "378679",
    source: "NYC API",
  },
  {
    name: "Uptown Grand Central",
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T12:00:00.000-04:00",
    endDate: "2022-07-13T20:00:00.000-04:00",
    permalink: "http://www1.nyc.gov/events/uptown-grand-central/378614/1",
    address:
      " EAST  125 STREET between PARK AVENUE and MADISON AVENUE  Manhattan",
    eventLat: "40.8043863",
    eventLng: "-73.9374292",
    databaseId: "378614",
    source: "NYC API",
  },
  {
    name: "175 street Greenmarket Thursdays",
    shortDesc: "Farmers Market",
    startDate: "2022-07-14T08:00:00.000-04:00",
    endDate: "2022-07-14T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/175-street-greenmarket-thursdays/379939/1",
    address:
      " WEST  175 STREET between WADSWORTH AVENUE and BROADWAY  Manhattan",
    eventLat: "40.8464761",
    eventLng: "-73.9399866",
    databaseId: "379939",
    source: "NYC API",
  },
  {
    name: "97 Street Greenmarket Friday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-15T08:00:00.000-04:00",
    endDate: "2022-07-15T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/97-street-greenmarket-friday/379912/1",
    address:
      " WEST   97 STREET between COLUMBUS AVENUE and AMSTERDAM AVENUE  Manhattan",
    eventLat: "40.8134463",
    eventLng: "-73.9562105",
    databaseId: "379912",
    source: "NYC API",
  },
  {
    name: "Crown Heights Farm Stand",
    shortDesc: "Farmers Market",
    startDate: "2022-07-15T08:00:00.000-04:00",
    endDate: "2022-07-15T17:00:00.000-04:00",
    permalink: "http://www1.nyc.gov/events/crown-heights-farm-stand/379719/1",
    address:
      " NOSTRAND AVENUE between CARROLL STREET and CROWN STREET  Brooklyn",
    eventLat: "40.6414369",
    eventLng: "-73.94856590000001",
    databaseId: "379719",
    source: "NYC API",
  },
  {
    name: "HHFM Metropolitan Market",
    shortDesc: "Farmers Market",
    startDate: "2022-07-15T08:00:00.000-04:00",
    endDate: "2022-07-15T15:00:00.000-04:00",
    permalink: "http://www1.nyc.gov/events/hhfm-metropolitan-market/379368/1",
    address:
      " SECOND AVENUE between EAST   97 STREET and EAST 98 STREET  Manhattan",
    eventLat: "40.7830603",
    eventLng: "-73.9712488",
    databaseId: "379368",
    source: "NYC API",
  },
  {
    name: "Lincoln Hospital Greenmarket Tuesday  Friday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-15T08:00:00.000-04:00",
    endDate: "2022-07-15T17:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/lincoln-hospital-greenmarket-tuesday--friday/379310/1",
    address: " EAST  149 STREET between PARK AVENUE and MORRIS AVENUE  Bronx",
    eventLat: "40.812119",
    eventLng: "-73.904099",
    databaseId: "379310",
    source: "NYC API",
  },
  {
    name: "Union Square Greenmarket Monday, Wednesday, Friday and Saturday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-15T08:00:00.000-04:00",
    endDate: "2022-07-15T19:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/union-square-greenmarket-monday-wednesday-friday-and-saturday/378680/1",
    address:
      " UNION SQUARE WEST between EAST   14 STREET and EAST   15 STREET  Manhattan",
    eventLat: "40.7358984",
    eventLng: "-73.9912281",
    databaseId: "378680",
    source: "NYC API",
  },
  {
    name: "Old Cathedral Outdoor Market",
    shortDesc: "Sidewalk Sale",
    startDate: "2022-07-15T09:00:00.000-04:00",
    endDate: "2022-07-15T20:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/old-cathedral-outdoor-market/379108/1",
    address:
      " PRINCE STREET between MOTT STREET and MULBERRY STREET  Manhattan",
    eventLat: "40.7193939",
    eventLng: "-73.9972731",
    databaseId: "379108",
    source: "NYC API",
  },
  {
    name: "57 Street Wednesday  Saturday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-16T08:00:00.000-04:00",
    endDate: "2022-07-16T18:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/57-street-wednesday--saturday/380013/1",
    address:
      " 10 AVENUE between WEST   57 STREET and WEST   58 STREET  Manhattan",
    eventLat: "40.7830603",
    eventLng: "-73.9712488",
    databaseId: "380013",
    source: "NYC API",
  },
  {
    name: "HHFM Lenox Avenue Market",
    shortDesc: "Farmers Market",
    startDate: "2022-07-16T08:00:00.000-04:00",
    endDate: "2022-07-16T15:00:00.000-04:00",
    permalink: "http://www1.nyc.gov/events/hhfm-lenox-avenue-market/379344/1",
    address:
      " LENOX AVENUE between WEST  117 STREET and WEST  118 STREET  Manhattan",
    eventLat: "40.7830603",
    eventLng: "-73.9712488",
    databaseId: "379344",
    source: "NYC API",
  },
  {
    name: "Union Square Greenmarket Monday, Wednesday, Friday and Saturday",
    shortDesc: "Farmers Market",
    startDate: "2022-07-16T08:00:00.000-04:00",
    endDate: "2022-07-16T19:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/union-square-greenmarket-monday-wednesday-friday-and-saturday/378681/1",
    address:
      " UNION SQUARE WEST between EAST   14 STREET and EAST   15 STREET  Manhattan",
    eventLat: "40.7358984",
    eventLng: "-73.9912281",
    databaseId: "378681",
    source: "NYC API",
  },
  {
    name: "Forest Fitness",
    shortDesc:
      "Join the Fort Tryon Park Trust for a free, year-round exercise program on Tuesdays, Thursdays, and Saturdays!",
    startDate: "2022-07-16T08:30:00.000-04:00",
    endDate: "2022-07-16T09:30:00.000-04:00",
    permalink: "http://www1.nyc.gov/events/forest-fitness/331550/25",
    address: "Margaret Corbin Circle",
    eventLat: "40.8625073",
    eventLng: "-73.9327086",
    databaseId: "331550",
    source: "NYC API",
  },
  {
    name: "Old Cathedral Outdoor Market",
    shortDesc: "Sidewalk Sale",
    startDate: "2022-07-16T09:00:00.000-04:00",
    endDate: "2022-07-16T20:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/old-cathedral-outdoor-market/379109/1",
    address:
      " PRINCE STREET between MOTT STREET and MULBERRY STREET  Manhattan",
    eventLat: "40.7193939",
    eventLng: "-73.9972731",
    databaseId: "379109",
    source: "NYC API",
  },
  {
    name: "RB Farmers Market Maria Hernandez Park",
    shortDesc: "Farmers Market",
    startDate: "2022-07-16T09:00:00.000-04:00",
    endDate: "2022-07-16T15:00:00.000-04:00",
    permalink:
      "http://www1.nyc.gov/events/rb-farmers-market-maria-hernandez-park/378850/1",
    address:
      " KNICKERBOCKER AVENUE between STARR STREET and SUYDAM STREET  Brooklyn",
    eventLat: "40.6987489",
    eventLng: "-73.9197228",
    databaseId: "378850",
    source: "NYC API",
  },
  {
    id: 144,
    name: "57 Street Wednesday  Saturday",
    complete: false,
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T12:00:00.000Z",
    endDate: "2022-07-13T22:00:00.000Z",
    permalink:
      "http://www1.nyc.gov/events/57-street-wednesday--saturday/380012/1",
    address:
      " 10 AVENUE between WEST   57 STREET and WEST   58 STREET  Manhattan",
    eventLat: 40.7830603,
    eventLng: -73.9712488,
    totalGuests: 0,
    databaseId: "380012",
    category: null,
    source: "NYC API",
    createdAt: "2022-07-13T14:50:40.469Z",
    updatedAt: "2022-07-13T14:50:40.469Z",
  },
  {
    id: 145,
    name: "Mount Sinai Greenmarket Wednesday",
    complete: false,
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T12:00:00.000Z",
    endDate: "2022-07-13T21:00:00.000Z",
    permalink:
      "http://www1.nyc.gov/events/mount-sinai-greenmarket-wednesday/379220/1",
    address:
      " MADISON AVENUE between EAST   98 STREET and EAST   99 STREET  Manhattan",
    eventLat: 40.7421612,
    eventLng: -73.9870435,
    totalGuests: 0,
    databaseId: "379220",
    category: null,
    source: "NYC API",
    createdAt: "2022-07-13T14:50:40.469Z",
    updatedAt: "2022-07-13T14:50:40.469Z",
  },
  {
    id: 146,
    name: "Union Square Greenmarket Monday, Wednesday, Friday and Saturday",
    complete: false,
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T12:00:00.000Z",
    endDate: "2022-07-13T23:00:00.000Z",
    permalink:
      "http://www1.nyc.gov/events/union-square-greenmarket-monday-wednesday-friday-and-saturday/378679/1",
    address:
      " UNION SQUARE WEST between EAST   14 STREET and EAST   15 STREET  Manhattan",
    eventLat: 40.7358984,
    eventLng: -73.9912281,
    totalGuests: 0,
    databaseId: "378679",
    category: null,
    source: "NYC API",
    createdAt: "2022-07-13T14:50:40.469Z",
    updatedAt: "2022-07-13T14:50:40.469Z",
  },
  {
    id: 154,
    name: "Uptown Grand Central",
    complete: false,
    shortDesc: "Farmers Market",
    startDate: "2022-07-13T16:00:00.000Z",
    endDate: "2022-07-14T00:00:00.000Z",
    permalink: "http://www1.nyc.gov/events/uptown-grand-central/378614/1",
    address:
      " EAST  125 STREET between PARK AVENUE and MADISON AVENUE  Manhattan",
    eventLat: 40.8043863,
    eventLng: -73.9374292,
    totalGuests: 0,
    databaseId: "378614",
    category: null,
    source: "NYC API",
    createdAt: "2022-07-13T14:50:40.878Z",
    updatedAt: "2022-07-13T14:50:40.878Z",
  },
];

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "80vh",
};

const center = { lat: 40.7589, lng: -73.9851 };
const Randomizer = () => {
  const randomOrder = uniqueRandomizer(dummyEvents.length);
  const renderCurrentEvent = () => {};

  const { isLoaded } = useJsApiLoader({
    id: "61b5009386a6596e",
    googleMapsApiKey: "AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78",
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // this interferes with the ability to use zoom seetings. do not utilize.
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <h1>HELLO THERE</h1>
      <p>This is my Randomizer</p>
      <h4>Testing Area!!!</h4>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: "61b5009386a6596e",
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>

      {/* <div>{renderCurrentEvent}</div> */}
    </div>
  ) : (
    <div>
      <h1>HELLO THERE</h1>
      <p>This is my Randomizer</p>
      <h4>Testing Area!!!</h4>
    </div>
  );
};

export default React.memo(Randomizer);
