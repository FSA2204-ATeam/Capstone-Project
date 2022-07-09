import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GET_SENTIMENT_ANALYSIS = "GET_SENTIMENT_ANALYSIS";

export const _getSentimentAnalysis = (analysis) => ({
  type: GET_SENTIMENT_ANALYSIS,
  analysis,
});

export const getSentimentAnalysis = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/sentimentAnalysis", null, {
        headers: { review: "I like testing things with javascript" },
      });
      console.log(data);
      dispatch(_getSentimentAnalysis(data));
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
  }
};

function TestingGround() {
  const [review, setReview] = useState("");

  const analysisResult = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSentimentAnalysis(event.target.review));
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
