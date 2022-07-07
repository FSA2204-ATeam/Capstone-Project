import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_PREFERENCES = 'SET_PREFERENCES';
//const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

/**
 * ACTION CREATORS
 */
const setPrefs = (preferences) => ({
  type: SET_PREFERENCES,
  preferences,
});

// const setUpdatedPrefs = (preferences) => ({
//   type: UPDATE_PREFERENCES,
//   preferences,
// });

/**
 * THUNK CREATORS
 */

export const updatePreferences = (updatedPrefs) => (dispatch) => {
  dispatch(setPrefs(updatedPrefs));
};

export const fetchUserPreferences = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.get('/api/users/preferences', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setPrefs(data));
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PREFERENCES:
      return action.preferences;
    default:
      return state;
  }
}
