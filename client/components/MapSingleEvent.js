import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRSVP, fetchUserEvents } from "../store/usersEvents";
import { InfoWindow } from "@react-google-maps/api";
import { friendlyDate } from "../../script/formatDate";

const MapSingleEvent = ({ randomOrder }) => {
  const dispatch = useDispatch();

  const allEvents = useSelector((state) => state.events.events);
  const usersEvents = useSelector((state) => state.usersEvents);
  const currentEvent = useSelector((state) => state.usersEvents.event);

  const [myAssociations, setMyAssociations] = useState(
    usersEvents.events.map((ele) => ele.users_events).map((ele) => ele.eventId)
  );
  const [idx, setIdx] = useState(0);
  const [activeEvent, setActiveEvent] = useState(allEvents[randomOrder[idx]]);

  useEffect(() => {
    setActiveEvent(allEvents[randomOrder[idx]]);
  }, [idx]);

  useEffect(() => {
    dispatch(fetchUserEvents());
  }, []);

  useEffect(() => {
    setMyAssociations(
      usersEvents.events
        .map((ele) => ele.users_events)
        .map((ele) => ele.eventId)
    );
  }, [usersEvents]);

  const onRSVPClick = (event) => {
    dispatch(setUserRSVP(event));
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
