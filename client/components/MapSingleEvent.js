import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserEvents,
  setUserRSVP,
  fetchUserEvents,
} from '../store/usersEvents';

import { InfoWindow, Marker } from '@react-google-maps/api';

const MapSingleEvent = ({ randomOrder, wildModeOff }) => {
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
    setActiveEvent(allEvents[randomOrder[idx]]);
  }, [idx]);

  useEffect(() => {
    setMyAssociations(myEvents.map((ele) => ele.id));
  }, [myEvents]);

  const onRSVPClick = (activeEvent) => {
    dispatch(setUserRSVP(activeEvent));
  };

  const onNextButton = () => {
    randomOrder[idx + 1] !== undefined ? setIdx(idx + 1) : setIdx(0);
  };

  return (
    <div>
      <Marker
        key={activeEvent.id}
        id={activeEvent.id}
        position={{
          lat: activeEvent.eventLat,
          lng: activeEvent.eventLng,
        }}
      >
        <InfoWindow
          position={{
            lat: parseFloat(activeEvent.eventLat),
            lng: parseFloat(activeEvent.eventLng),
          }}
          onCloseClick={() => wildModeOff()}
        >
          <div>
            <div>
              <div>{activeEvent.name}</div>
              <div>{activeEvent.shortDesc}</div>
            </div>
            <div>
              {`${new Date(
                Date.parse(activeEvent.startDate)
              ).toLocaleString()} to ${new Date(
                Date.parse(activeEvent.endDate)
              ).toLocaleString()}`}
            </div>
            {myAssociations.includes(activeEvent.id) ? (
              <em>Thank you for selecting this event to attend!</em>
            ) : (
              <button onClick={() => onRSVPClick(activeEvent)}>
                Let's Go!
              </button>
            )}
            <button onClick={() => onNextButton()}>Next</button>
          </div>
        </InfoWindow>
      </Marker>
    </div>
  );
};

export default MapSingleEvent;
