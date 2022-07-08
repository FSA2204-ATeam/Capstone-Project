import axios from "axios";

const SET_USER_RSVP = "SET_USER_RSVP";

export const _setUserRSVP = (idx) => ({
  type: SET_USER_RSVP,
  idx,
});

export const setUserRSVP = (event) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  try {
    console.log("Thunk activated event", event);
    const { data } = await axios.post("/api/usersEvents", event, {
      headers: {
        authorization: token,
      },
    });
    console.log("data -->", data);
    //dispatch(_setUserRSVP(userRSVP));
  } catch (error) {
    console.error(error);
  }
};

const usersEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_RSVP:
      return action.userRSVP;
    default:
      return state;
  }
};

export default usersEventsReducer;
