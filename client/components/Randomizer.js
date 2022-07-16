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
  const allEvents = useSelector((state) => state.events.events);

  const [randomOrder, setRandomOrder] = useState([]);

  useEffect(() => {
    setRandomOrder(uniqueRandomizer(allEvents.length));
  }, [allEvents]);

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
        {randomOrder[0] ? <MapSingleEvent randomOrder={randomOrder} /> : null}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Randomizer);
