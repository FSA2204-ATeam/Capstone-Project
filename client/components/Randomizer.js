import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import uniqueRandomizer from "../../script/uniqueRandomizer";
import SingleEvent from "./SingleEvent";
import MapSingleEvent from "./MapSingleEvent";
import { useSelector } from "react-redux";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
};

const center = { lat: 40.7589, lng: -73.9851 };

const Randomizer = () => {
  const allEvents = useSelector((state) => state.allEvents);

  const [randomOrder, setRandomOrder] = useState([]);

  useEffect(() => {
    console.log(
      "inside Randomizer useEvent: ",
      uniqueRandomizer(allEvents.length)
    );
    setRandomOrder(uniqueRandomizer(allEvents.length));
    console.log(
      "inside Randomizer useEffect: ",
      uniqueRandomizer(allEvents.length)
    );
  }, [allEvents]);

  console.log("inside Randomizer Component - All Events: ", randomOrder);

  const { isLoaded } = useJsApiLoader({
    id: "61b5009386a6596e",
    googleMapsApiKey: "AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78",
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
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
      >
        {/* {allEvents[0] ? <MapSingleEvent randomOrder={randomOrder} /> : null} */}
      </GoogleMap>
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
