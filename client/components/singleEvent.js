//PURPOSE OF PAGE:

// The purpose of this page is to create a component that can be rendered within our User's profile page.

// Functionality:
// 1. Submit a review to be populated in the UsersEvents Table.
// 2. Upon submission of review, the Watson sentimentAnalysis API POST route will be called with the review text (string)
// 3. The API will return a "score" & "label" to be stored in the UsersEvents model as "sentimentScore" & "sentimentLabel"

//Further build out:
// a. Randomizer will pull sentimentScore & sentimentLabel weights to influence which categories are pushed to the User

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const singleEventCard = (props) => {
  console.log("These are passed props--->", props);

  //VARIABLES//
  const {
    name,
    shortDesc,
    address,
    datePart,
    timePart,
    permaLink,
    totalGuests,
  } = props;
};
