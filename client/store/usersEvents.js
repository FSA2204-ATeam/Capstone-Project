import axios from "axios";

const token = window.localStorage.getItem("token");

const SET_USER_RSVP = "SET_USER_RSVP";
const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";
const FETCH_USER_REVIEWS = "FETCH_USER_REVIEWS";
const SET_USER_EVENTS = "SET_USER_EVENTS";
const REMOVE_USER_EVENT = "REMOVE_USER_EVENT";

export const _setUserRSVP = (event) => ({
  type: SET_USER_RSVP,
  event,
});

export const _fetchUserEvents = (userEvents) => ({
  type: FETCH_USER_EVENTS,
  userEvents,
});

export const _fetchUserReviews = (reviews) => ({
  type: FETCH_USER_REVIEWS,
  reviews,
});

export const _setUserEvents = (events) => ({
  type: SET_USER_EVENTS,
  events,
});

export const _removeUserEvent = (userEvent) => ({
  type: REMOVE_USER_EVENT,
  userEvent,
});

export const setUserRSVP = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/usersEvents", event, {
      headers: {
        authorization: token,
      },
    });

    const { data: updatedEvent } = await axios.put("/api/usersEvents", data, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setUserRSVP(updatedEvent));
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

export const fetchUserReviews = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/usersEvents/userReviews", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_fetchUserReviews(data));
  } catch (error) {
    console.error(error);
  }
};
export const setUserEvents = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/usersEvents", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeUsersEvent = (eventId, userId) => async (dispatch) => {
  try {
    const { data: userEvent } = await axios.delete("/api/usersEvents", {
      headers: {
        authorization: token,
      },
      data: { eventId, userId },
    });
    dispatch(_removeUserEvent(userEvent));
  } catch (error) {
    console.error(error);
  }
};

const usersEventsReducer = (state = { events: [], reviews: [] }, action) => {
  switch (action.type) {
    case SET_USER_RSVP:
      console.log("Action Event", action.event);
      console.log("Copy of State", {
        ...state,
        events: [...state.events, action.event],
      });
      return { ...state, events: [...state.events, action.event] };
    case FETCH_USER_EVENTS:
      return { ...state, events: action.userEvents };
    case FETCH_USER_REVIEWS:
      return { ...state, reviews: action.reviews };
    case SET_USER_EVENTS:
      return { ...state, events: action.events };
    case REMOVE_USER_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== action.userEvent.eventId
        ),
      };
    default:
      return state;
  }
};

export default usersEventsReducer;
