import axios from "axios";

const token = window.localStorage.getItem("token");

const GET_EVENTS = "GET_EVENTS";
const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";
// const SET_USER_EVENTS = "SET_USER_EVENTS";

export const _getEvents = (events) => ({
  type: GET_EVENTS,
  events,
});

export const _fetchUserEvents = (events) => ({
  type: FETCH_USER_EVENTS,
  events,
});

// export const _setUserEvents = (events) => ({
//   type: SET_USER_EVENTS,
//   events,
// });

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/events");
    dispatch(_getEvents(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserEvents = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events/:${userId}`, userId);
    dispatch(_fetchUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

// export const setUserEvents = (userId) => async (dispatch) => {
//   try {
//     console.log("userEvents THUNK activated");
//     const { data } = await axios.get("/api/events/myevents", {
//       headers: {
//         authorization: token,
//       },
//     });
//     console.log("DID MAKE IT?-->", data);
//     dispatch(_setUserEvents(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case FETCH_USER_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default eventsReducer;
