import axios from "axios";

const SET_USER_EVENT = "SET_USER_EVENT";
//const SET_USER_RSVP = "SET_USER_RSVP";

export const _setUserEvent = (event) => ({
  type: SET_USER_EVENT,
  event,
});

// export const _setUserRSVP = (idx) => ({
//   type: SET_USER_RSVP,
//   idx,
// });

export const setUserEvent = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/events", idx);
    dispatch(_setUserEvent(data));
  } catch (error) {
    console.error(error);
  }
};

// export const setUserRSVP = (id) => async (dispatch) => {
//   try {
//     const { data: userRSVP } = await axios.put("/api/userRSVP", id);
//     dispatch(_setUserRSVP(userRSVP));
//   } catch (error) {
//     console.error(error);
//   }
// };

//is state an object {} here?
const singleEventReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_EVENT:
      return action.event;
    // case SET_USER_RSVP:
    //   return [...state, action.userRSVP];
    default:
      return state;
  }
};

export default singleEventReducer;
