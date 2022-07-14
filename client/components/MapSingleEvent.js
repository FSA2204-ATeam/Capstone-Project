import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRSVP } from "../store/usersEvents";
import { InfoWindow } from "@react-google-maps/api";
import uniqueRandomizer from "../../script/uniqueRandomizer";

const MapSingleEvent = (randomOrder) => {
  const dispatch = useDispatch();

  const allEvents = useSelector((state) => state.allEvents);
  console.log("allEvents inside mapSingleComponent", allEvents);
  const [idx, setIdx] = useState(0);

  console.log("loooking for first random event", randomOrder[idx]);

  const [activeEvent, setActiveEvent] = useState(allEvents[randomOrder[idx]]);

  const onRSVPClick = (event) => {
    dispatch(setUserRSVP(event));
  };

  const onNextButton = () => {
    if (randomOrder[idx + 1]) setIdx(idx++);
    else setIdx(0);
  };

  useEffect(() => {
    setActiveEvent(allEvents(randomOrder[idx]));
  });

  console.log("activeEvent", activeEvent);
  return (
    <div>
      <InfoWindow
        position={{
          lat: parseFloat(activeEvent.eventLat),
          lng: parseFloat(activeEvent.eventLng),
        }}
        onCloseClick={() => setActiveEvent(null)}
      >
        <div>
          <div>{activeEvent.shortDesc}</div>
          <div>
            {activeEvent.startDate} from {activeEvent.endDate}
          </div>

          <button onClick={() => onRSVPClick(activeEvent)}>RSVP</button>
          <button onClick={() => onNextButton()}>Next</button>
        </div>
      </InfoWindow>
    </div>
  );
};

export default MapSingleEvent;
