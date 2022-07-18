import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import { useFrontEndStyles } from "../theme";

const SingleEvent = ({ props }) => {
  const classes = useFrontEndStyles();
  
  return (
    <div>
      <Card elevation={3} className={classes.singleEv}>
        <CardContent>
          <Typography variant="body2">
        <p>{props.shortDesc} </p>
        <p>
          {`${new Date(
            Date.parse(props.startDate)
          ).toLocaleString()} to ${new Date(
            Date.parse(props.endDate)
          ).toLocaleString()}`}
        </p>
        <p>Address: {props.address}</p>
        <p>Current RSVPs: {props.totalGuests}</p>
        <p align="center">
          <Link href={`${props.permalink}`}>Website</Link>
        </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEvent;
