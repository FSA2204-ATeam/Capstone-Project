import axios from "axios";

const token = window.localStorage.getItem("token");

const SET_USER_RSVP = "SET_USER_RSVP";
const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";

export const _setUserRSVP = (idx) => ({
  type: SET_USER_RSVP,
  idx,
});

export const _fetchUserEvents = (userEvents) => ({
  type: FETCH_USER_EVENTS,
  userEvents,
});

export const setUserRSVP = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/usersEvents", event, {
      headers: {
        authorization: token,
      },
    });
    data.totalGuests++;
    const { updatedData } = await axios.put("/api/usersEvents", data, {
      headers: {
        authorization: token,
      },
    });
    //dispatch(_setUserRSVP(userRSVP));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/usersEvents", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_fetchUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

const usersEventsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER_RSVP:
      return action.userRSVP;
    case FETCH_USER_EVENTS:
      return action.userEvents;
    default:
      return state;
  }
};

export default usersEventsReducer;
