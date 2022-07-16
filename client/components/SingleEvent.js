import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SingleEvent = ({ props }) => {
  return (
    <div>
      <h3>My Event Details</h3>
      <div>
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
      </div>
    </div>
  );
};

export default SingleEvent;
