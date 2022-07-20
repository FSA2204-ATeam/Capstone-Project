import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Link } from '@material-ui/core';
import { useFrontEndStyles } from '../theme';

const SingleEvent = ({ props }) => {
  const classes = useFrontEndStyles();

  return (
    <div style={{ fontSize: '15px', fontFamily: 'Poppins' }}>
      <p>{props.shortDesc} </p>
      <p>
        {`${new Date(Date.parse(props.startDate)).toLocaleString('en-us', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })} to ${new Date(Date.parse(props.endDate)).toLocaleString('en-us', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}`}
      </p>
      {props.address ? <p>Address: {props.address}</p> : null}
      <p>Current RSVPs: {props.totalGuests}</p>
      <p>
        <Link href={`${props.permalink}`}>Website</Link>
      </p>
    </div>
  );
};

export default SingleEvent;
