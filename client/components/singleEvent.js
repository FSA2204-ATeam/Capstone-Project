import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SingleEvent = ({ props }) => {
  console.log("These are passed props--->", props);
  return (
    <div>
      <h3>My Event Details</h3>
      <div>
        <p>Info: {props.shortDesc} </p>
        <p>Address: {props.address}</p>
        <p>Current RSVPs: {props.totalGuests}</p>
        <a href={`${props.permalink}`}>Website</a>
      </div>
    </div>
  );
};

export default SingleEvent;
