import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserEvents,
  setUserRSVP,
  fetchUserEvents,
} from "../store/usersEvents";

import { InfoWindow } from "@react-google-maps/api";

const MapSingleEvent = ({ randomOrder }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const myEvents = useSelector((state) => state.usersEvents.events);
  const allEvents = useSelector((state) => state.events.events);

  const [myAssociations, setMyAssociations] = useState(myEvents);

  const [idx, setIdx] = useState(0);
  const [activeEvent, setActiveEvent] = useState(allEvents[randomOrder[idx]]);

  useEffect(() => {
    dispatch(setUserEvents(user.id));
    dispatch(fetchUserEvents());
  }, []);

  useEffect(() => {
    console.log("did idx update?", idx);
    setActiveEvent(allEvents[randomOrder[idx]]);
  }, [idx]);

  useEffect(() => {
    console.log("did usersEvents update my associations?", myAssociations);
    setMyAssociations(myEvents.map((ele) => ele.id));
  }, [idx]);

  const onRSVPClick = (activeEvent) => {
    dispatch(setUserRSVP(activeEvent));
  };

  const onNextButton = () => {
    randomOrder[idx + 1] !== undefined ? setIdx(idx + 1) : setIdx(0);
  };

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
            {`${new Date(
              Date.parse(activeEvent.startDate)
            ).toLocaleString()} to ${new Date(
              Date.parse(activeEvent.endDate)
            ).toLocaleString()}`}
          </div>
          {myAssociations.includes(activeEvent.id) ? (
            <>You've already RSVP'd to this event</>
          ) : (
            <button onClick={() => onRSVPClick(activeEvent)}>RSVP</button>
          )}
          <button onClick={() => onNextButton()}>Next</button>
        </div>
      </InfoWindow>
    </div>
  );
};

export default MapSingleEvent;
