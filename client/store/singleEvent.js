import axios from "axios";

const SET_USER_EVENT = "SET_USER_EVENT";

export const _setUserEvent = (event) => ({
  type: SET_USER_EVENT,
  event,
});

export const setUserEvent = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/events", idx);
    dispatch(_setUserEvent(data));
  } catch (error) {
    console.error(error);
  }
};

const singleEventReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default singleEventReducer;
