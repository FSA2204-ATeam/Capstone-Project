import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRSVP, fetchUserEvents } from "../store/usersEvents";
import { InfoWindow } from "@react-google-maps/api";
import { friendlyDate } from "../../script/formatDate";

const MapSingleEvent = ({ randomOrder }) => {
  const dispatch = useDispatch();

  const allEvents = useSelector((state) => state.events.events);
  const usersEvents = useSelector((state) => state.usersEvents.events);

  const [myAssociations, setMyAssociations] = useState(usersEvents);
  console.log("ASS", myAssociations);
  const [idx, setIdx] = useState(0);
  const [myEvents, setMyEvents] = useState(usersEvents);
  const [activeEvent, setActiveEvent] = useState(allEvents[randomOrder[idx]]);

  useEffect(() => {
    setMyEvents(usersEvents);
  }, [usersEvents]);

  useEffect(() => {
    setActiveEvent(allEvents[randomOrder[idx]]);
  }, [idx]);

  useEffect(() => {
    setMyAssociations(usersEvents.map((ele) => ele.id));
  }, [usersEvents]);

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
