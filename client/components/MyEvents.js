import React, { useState, useEffect, useReducer } from "react";
import { setUserEvents, removeUsersEvent } from "../store/usersEvents";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
} from "@material-ui/core";

const MyEvents = () => {
  const user = useSelector((state) => state.auth);
  const myEvents = useSelector((state) => state.usersEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserEvents(user.id));
  }, []);

  const onRemoveClick = (eventId, userId) => {
    dispatch(removeUsersEvent(eventId, userId));
  };

  return (
    <div>
      <h1>{`${user.username}'s Events`}:</h1>
      {myEvents.map((event) => {
        return (
          <div key={event.id}>
            <Card
              elevation={3}
              variant="elevation"
              style={{ background: "lightGray" }}
            >
              <h3>{event.name}</h3>
              <p>
                {event.datePart} from {event.timePart}
              </p>
              <Button>Details</Button>
              <Button onClick={() => onRemoveClick(event.id, user.id)}>
                Remove
              </Button>
              <Link to="/review">Review</Link>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MyEvents;
