import React, { useState, useEffect, useReducer } from 'react';
import {
  setUserEvents,
  removeUsersEvent,
  fetchUserReviews,
} from '../store/usersEvents';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Box,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Container,
  Grid,
} from '@material-ui/core';
import MyEventReview from './MyEventReview';
import SingleEvent from './SingleEvent';
import UpdateHostedEvent from './UpdateHostedEvent';
import { useFrontEndStyles } from "../theme";

const MyEvents = () => {
  const user = useSelector((state) => state.auth);
  const myEvents = useSelector((state) => state.usersEvents.events);
  const myReviews = useSelector((state) => state.usersEvents.reviews);

  const [onShowDetailsClick, setOnShowDetailsClick] = useState(null);
  const [onReviewClick, setOnReviewClick] = useState(null);
  const [onUpdateClick, setUpdateClick] = useState(null);

  const classes = useFrontEndStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserEvents(user.id));
    dispatch(fetchUserReviews());
  }, []);

  useEffect(() => {
    console.log('myEvents useEffect fired');
    const result = myEvents.filter((ele) => ele.users_events.host === true);
    console.log(result);
    if (result) setMyHostedEvents(result);
  }, [myEvents]);

  const onRemoveClick = (eventId, userId) => {
    dispatch(removeUsersEvent(eventId, userId));
  };

  // const onUpdateClick = (event) => {
  //   console.log("Updated Clicked");
  // };

  const [myHostedEvents, setMyHostedEvents] = useState(
    myEvents.filter((element) => element.users_events.host === true)
  );

  return (
    <div>
      <h1>{`${user.username}'s Events`}:</h1>
      {myEvents.map((event, idx) => {
        return (
          <div key={event.id}>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            > 
              <Typography className={classes.myEventsStyle}>{event.name}</Typography>
              <Button
                onClick={() => {
                  onShowDetailsClick !== null && onShowDetailsClick === idx
                    ? setOnShowDetailsClick(null)
                    : setOnShowDetailsClick(idx);
                  onReviewClick !== null && idx !== onReviewClick
                    ? setOnReviewClick(null)
                    : null;
                }}
              >
                Details
              </Button>
              <Button
                onClick={() => {
                  onReviewClick !== null && onReviewClick === idx
                    ? setOnReviewClick(null)
                    : setOnReviewClick(idx);
                  onShowDetailsClick !== null && idx !== onShowDetailsClick
                    ? setOnShowDetailsClick(null)
                    : null;
                }}
              >
                Review
              </Button>
              <Button onClick={() => onRemoveClick(event.id, user.id)}>
                Remove
              </Button>
              {event.users_events.host === true ? (
                <Button
                  onClick={() => {
                    onUpdateClick !== null
                      ? setUpdateClick(null)
                      : setUpdateClick(idx);
                  }}
                >
                  Update
                </Button>
              ) : null}
              {onShowDetailsClick === idx ? (
                <SingleEvent props={event} />
              ) : null}

              {onReviewClick === idx ? <MyEventReview event={event} /> : null}
              {onUpdateClick === idx ? (
                <UpdateHostedEvent event={event} />
              ) : null}
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default MyEvents;
