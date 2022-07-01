import axios from "axios";

const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";

export const _fetchUserEvents = (events) => ({
  type: FETCH_USER_EVENTS,
  events,
});

export const fetchUserEvent = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/events/:userId", userId);
    dispatch(_fetchUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default eventsReducer;
