import axios from 'axios';

const TOKEN = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
};

export const fetchUserProfile = async () => {
  // return async (dispatch) => {
  try {
    const userPreferences = await axios.get('/api/users/preferences', TOKEN);
    console.log('THE GET', userPreferences);

    /////THIS IS JUST FOR TESTING PURPOSES/////
    // const updatedPreferences = await axios.put(
    //   '/api/users/preferences',

    //   { CAT_Art: true, CAT_Food: true, CAT_Music: true },
    //   TOKEN
    // );
    // console.log('THE PUT', updatedPreferences);
    /////THIS IS JUST FOR TESTING PURPOSES/////
  } catch (err) {
    console.error(err);
  }
  // };
};
