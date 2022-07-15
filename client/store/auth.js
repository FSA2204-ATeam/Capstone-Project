import axios from 'axios';
import history from '../history';
//import { fetchUserPreferences } from './userPreferences';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */

export const updateProfile = (updatedProfile) => (dispatch) => {
  dispatch(setAuth(updatedProfile));
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    //dispatch(fetchUserPreferences());
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  ({username, password}, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      history.push("/landing");
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const registration =
  ({firstname, lastname, email, username, password}, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        firstname,
        lastname,
        email,
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      history.push("/landing");
      console.log(res);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/landing");

  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
