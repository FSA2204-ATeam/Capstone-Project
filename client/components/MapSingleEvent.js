import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserEvents,
  setUserRSVP,
  fetchUserEvents,
} from '../store/usersEvents';
import {
  Button,
  Grid,
  Card,
  ButtonGroup,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { useFrontEndStyles } from '../theme';

import { InfoWindow, Marker } from '@react-google-maps/api';

const MapSingleEvent = ({ randomOrder, wildModeOff }) => {
  const dispatch = useDispatch();

  const classes = useFrontEndStyles();

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
          <Card style={{ border: 'none', boxShadow: 'none' }}>
            <div>
              <div style={{ fontSize: '15px', fontFamily: 'Poppins' }}>
                <p style={{ fontSize: '20px', fontFamily: 'Poppins' }}>
                  {' '}
                  {activeEvent.name}
                </p>
                <p>{activeEvent.shortDesc}</p>

                <p>
                  {`${new Date(
                    Date.parse(activeEvent.startDate)
                  ).toLocaleString('en-us', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })} to ${new Date(
                    Date.parse(activeEvent.endDate)
                  ).toLocaleString('en-us', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}`}
                </p>
                {myAssociations.includes(activeEvent.id) ? (
                  <p>Thank you for selecting this event to attend!</p>
                ) : (
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    <Button onClick={() => onRSVPClick(activeEvent)}>
                      Let's Go!
                    </Button>
                  </ButtonGroup>
                )}
                <>{'             '}</>
                <ButtonGroup variant="contained" size="small" color="secondary">
                  <Button onClick={() => onNextButton()}>Next</Button>
                </ButtonGroup>
              </div>
            </div>
          </Card>
        </InfoWindow>
      </Marker>
    </div>
  );
};

export default MapSingleEvent;
