import axios from 'axios';

const TOKEN = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
};

export const fetchUserProfile = async () => {
  //console.log(TOKEN);
  // return async (dispatch) => {
  try {
    const userPreferences = await axios.get('/api/users/preferences', TOKEN);
    console.log(
      'returned object from axios poreferences fetch',
      userPreferences
    );
  } catch (err) {
    console.error(err);
  }
  // };
};
