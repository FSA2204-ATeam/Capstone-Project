import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from '@material-ui/core';
import { useFrontEndStyles } from "../theme";

const SingleEvent = ({ props }) => {
  const classes = useFrontEndStyles();

  return (
    <div>
      <Grid
      container
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <Typography className={classes.singleEvHead}>
          My Event Details
        </Typography>
      <div>
        <Typography className={classes.singleEv}>
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
        <a href={`${props.permalink}`}>Website</a>
        </Typography>
      </div>
      </Grid>
    </div>
  );
};

export default SingleEvent;
