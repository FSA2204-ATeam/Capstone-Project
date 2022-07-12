import axios from "axios";
const token = window.localStorage.getItem("token");

const GET_SENTIMENT_ANALYSIS = "GET_SENTIMENT_ANALYSIS";
const SET_SENTIMENT_ANALYSIS = "SET_SENTIMENT_ANALYSIS";

export const _getSentimentAnalysis = (analysis) => ({
  type: GET_SENTIMENT_ANALYSIS,
  analysis,
});

export const _setSentimentAnalysis = (analysis) => ({
  type: SET_SENTIMENT_ANALYSIS,
  analysis,
});

export const getSentimentAnalysis = (review, eventId) => {
  console.log("RIGHT STUFF?", review, eventId);
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/sentimentAnalysis", null, {
        headers: { review },
      });
      console.log(
        `Watson says my review is ${data.label}, with a score of ${data.score}!`
      );
      dispatch(_getSentimentAnalysis(data));
      console.log("AXIOS PUT ACTIVATION with", data);
      console.log("Event id gradded?", eventId);

      const { updated } = await axios.put(
        "/api/sentimentAnalysis",
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
      console.log("Updated UserEvent", updated);
      //dispatch(_setSentimentAnalysis(data));
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
