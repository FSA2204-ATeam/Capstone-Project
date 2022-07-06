import axios from 'axios';

const TOKEN = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
};

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
export const fetchUserProfile = async () => {
  // return async (dispatch) => {
  try {
    // const userPreferences = await axios.get('/api/users/preferences', TOKEN);
    // console.log('THE GET', userPreferences);

    /////THIS IS JUST FOR TESTING PURPOSES/////
    const updatedPreferences = await axios.put(
      '/api/users/preferences',

      { CAT_Art: true, CAT_Food: false, CAT_Music: true },
      TOKEN
    );
    console.log('THE PUT', updatedPreferences);
    /////THIS IS JUST FOR TESTING PURPOSES/////
  } catch (err) {
    console.error(err);
  }
  // };
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
