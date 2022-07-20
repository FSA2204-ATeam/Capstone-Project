import axios from 'axios';
const token = window.localStorage.getItem('token');

const GET_SENTIMENT_ANALYSIS = 'GET_SENTIMENT_ANALYSIS';
const SET_SENTIMENT_ANALYSIS = 'SET_SENTIMENT_ANALYSIS';

export const _getSentimentAnalysis = (analysis) => ({
  type: GET_SENTIMENT_ANALYSIS,
  analysis,
});

export const _setSentimentAnalysis = (analysis) => ({
  type: SET_SENTIMENT_ANALYSIS,
  analysis,
});

export const getSentimentAnalysis = (
  review,
  eventId,
  updtSubmissionFeedback
) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/sentimentAnalysis', null, {
        headers: { review },
      });

      dispatch(_getSentimentAnalysis(data));

      const updated = await axios.put(
        '/api/sentimentAnalysis',
        {
          ...data,
          eventId: eventId,
          review: review,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (updated.status === 200) updtSubmissionFeedback(data);
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

const sentimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SENTIMENT_ANALYSIS:
      return action.analysis;
    case SET_SENTIMENT_ANALYSIS:
      return action.analysis;
    default:
      return state;
  }
};

export default sentimentReducer;
