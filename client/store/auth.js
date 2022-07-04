import axios from 'axios';
import history from '../history';

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
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const registration =
  (firstname, lastname, email, username, password, method) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        firstname,
        lastname,
        email,
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      console.log(res);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const updateProfile = (updatedProfile) => {
  console.log('UPDATE PROFILE HAS BEEN CALLED WITH ', updatedProfile);
  // const token = window.localStorage.getItem(TOKEN);
  // if (token) {
  //   const res = await axios.put('/auth/updateProfile', updatedProfile, {
  //     headers: {
  //       authorization: token,
  //     },
  //   });
  //   console.log('resresresres', res);
  //   //return dispatch(setAuth(res.data));
  // }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
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
