import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import { useFrontEndStyles } from "../theme";

const SingleEvent = ({ props }) => {
  const classes = useFrontEndStyles();
  
  return (
    <div>
      {/* <Card> */}
        {/* <CardContent> */}
          <Typography variant="body2">
        <p>{props.shortDesc} </p>
        <p>
          {`${new Date(
            Date.parse(props.startDate)
          ).toLocaleString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})} to ${new Date(
            Date.parse(props.endDate)
          ).toLocaleString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}`}
        </p>
        {props.address ? (
          <p>Address: {props.address}</p>
        ) : (
          null
        )}
        <p>Current RSVPs: {props.totalGuests}</p>
        <p align="center">
          <Link href={`${props.permalink}`}>Website</Link>
        </p>
          </Typography>
        {/* </CardContent> */}
      {/* </Card> */}
    </div>
  );
};

export default SingleEvent;
