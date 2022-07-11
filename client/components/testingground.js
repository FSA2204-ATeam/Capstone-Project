import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export const getSentimentAnalysis = (review) => {
  return async (dispatch) => {
    try {
      console.log("inside getSentimentAnalysis: ", review);
      const { data } = await axios.post("/api/sentimentAnalysis", null, {
        headers: { review },
      });
      console.log(
        `Watson says my review is ${data.label}, with a score of ${data.score}!`
      );
      dispatch(_getSentimentAnalysis(data));
      dispatch(_setSentimentAnalysis(data));
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

function TestingGround() {
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState({});
  const analysisResult = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("This is my submitted Review: ", review);
    dispatch(getSentimentAnalysis(review));
  };

  return (
    <div>
      <h1>Header</h1>
      <p>This is a test of where this thing is.</p>
      <form id="test-review-submit" onSubmit={handleSubmit}>
        <label>
          Review:
          <input
            name="review"
            type="text"
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>

      <p></p>
    </div>
  );
}

export default TestingGround;
