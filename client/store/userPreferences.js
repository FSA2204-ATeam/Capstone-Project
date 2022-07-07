import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_PREFERENCES = 'SET_PREFERENCES';

/**
 * ACTION CREATORS
 */
const setPreferences = (preferences) => ({
  type: SET_PREFERENCES,
  preferences,
});

/**
 * THUNK CREATORS
 */

export const fetchUserPreferences = () => async (dispatch) => {
  console.log('fetchUserPreferences RUNNING');
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.get('/api/users/preferences', {
      headers: {
        authorization: token,
      },
    });

    const catPrefsOnly = Object.keys(data)
      .filter((key) => key.includes('CAT_'))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: data[key],
        });
      }, {});

    console.log(catPrefsOnly);

    return dispatch(setPreferences(catPrefsOnly));
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

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PREFERENCES:
      console.log('REDUCER STATE PREFERENCES', action.preferences);
      return action.preferences;
    default:
      return state;
  }
}
