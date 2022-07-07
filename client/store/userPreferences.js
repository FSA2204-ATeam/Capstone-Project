import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_PREFERENCES = 'SET_PREFERENCES';
const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

/**
 * ACTION CREATORS
 */
const setPrefs = (preferences) => ({
  type: SET_PREFERENCES,
  preferences,
});

const setUpdatedPrefs = (preferences) => ({
  type: UPDATE_PREFERENCES,
  preferences,
});

/**
 * THUNK CREATORS
 */

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

  /////THIS IS JUST FOR TESTING PURPOSES/////
  // const updatedPreferences = await axios.put(
  //   '/api/users/preferences',

  //   { CAT_Art: true, CAT_Food: false, CAT_Music: true },
  //   TOKEN
  // );
  // console.log('THE PUT', updatedPreferences);
  /////THIS IS JUST FOR TESTING PURPOSES/////
};

export const updatePreferences = (updatedPreferences) => (dispatch) => {
  dispatch(setUpdatedPrefs(updatedPreferences));
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PREFERENCES:
      return action.preferences;
    case UPDATE_PREFERENCES:
      return action.preferences;
    default:
      return state;
  }
}
