import axios from 'axios';

// ACTION TYPES
const SET_All_EVENTS = 'SET_All_EVENTS';

// ACTION CREATORS
const setAllEvts = (allEvts) => ({
  type: SET_All_EVENTS,
  allEvts,
});

// THUNK CREATORS
export const fetchAllEvts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/events');
    return dispatch(setAllEvts(data));
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_All_EVENTS:
      return action.allEvts;
    default:
      return state;
  }
}
