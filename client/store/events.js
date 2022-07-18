import axios from 'axios';
import { fetchUserEvents } from './usersEvents';

const token = window.localStorage.getItem('token');

const GET_EVENTS = 'GET_EVENTS';
const FETCH_EVENTS = 'FETCH_EVENTS';
const ADD_USER_DEFINED_EVENT = 'ADD_USER_DEFINED_EVENT';
const UPDATE_USER_DEFINED_EVENT = 'UPDATE_USER_DEFINED_EVENT';

export const _getEvents = (events) => ({
  type: GET_EVENTS,
  events,
});

export const _fetchEvents = (events) => ({
  type: FETCH_USER_EVENTS,
  events,
});

export const _addUserDefinedEvent = (event) => ({
  type: ADD_USER_DEFINED_EVENT,
  event,
});

export const _updateUserDefinedEvent = (event) => ({
  type: UPDATE_USER_DEFINED_EVENT,
  event,
});

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/events', {
      headers: { authorization: token },
    });
    dispatch(_getEvents(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchEvents = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/usersevents`, userId, {
      headers: { authorization: token },
    });
    dispatch(_fetchUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

export const addUserDefinedEvent = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/events', event, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(addUserDefinedEvent(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateUserDefinedEvent = (event, userId) => async (dispatch) => {
  try {
    const { data: updated } = await axios.put('/api/events', event, {
      headers: {
        authorization: token,
      },
    });
    if (updated) {
      return dispatch(fetchUserEvents(userId));
    }
  } catch (err) {
    console.error(err);
  }
};

const eventsReducer = (state = { events: [], event: {} }, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.events };
    case FETCH_EVENTS:
      return { ...state, events: action.events };
    case ADD_USER_DEFINED_EVENT:
      return { ...state, event: action.event };
    default:
      return state;
  }
};

export default eventsReducer;
