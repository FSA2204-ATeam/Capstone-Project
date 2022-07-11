import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { setUserEvents } from "../store/usersEvents";
import { me } from "../store/auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MyEvents = () => {
  const usersEvents = useSelector((state) => state.usersEvents);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ID", user.id);
    dispatch(setUserEvents(user.id));
  }, []);

  return (
    <div>
      {/* {usersEvents.map((element) => {
        return <div key={element.eventId}>{element.eventId}</div>;
      })}
      ; */}
      HELLO WORLD I AM HERE DO YOU SEE ME?
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     user: state.auth,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     // loadInitialData() {
//     //   dispatch(me());
//     // },
//   };
// };

export default MyEvents;
