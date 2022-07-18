import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Link } from '@material-ui/core';
import { useFrontEndStyles } from "../theme";

const SingleEvent = ({ props }) => {
  const classes = useFrontEndStyles();

  return (
    <div>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <Typography className={classes.singleEvHead}>
          My Event Details
        </Typography>
      <div>
        <Typography className={classes.singleEv}>
        <Grid item>
          <p>{props.shortDesc} </p>
        </Grid>
        <Grid item>
        <p>
          {`${new Date(
            Date.parse(props.startDate)
          ).toLocaleString()} to ${new Date(
            Date.parse(props.endDate)
          ).toLocaleString()}`}
        </p>
        </Grid>
        <Grid item>
        <p>Address: {props.address}</p>
        </Grid>
        <Grid item>
        <p>Current RSVPs: {props.totalGuests}</p>
        </Grid>
        <Grid item>
        <Link href={`${props.permalink}`}>Website</Link>
        </Grid>
        </Typography>
      </div>
      </Grid>
    </div>
  );
};

export default SingleEvent;
