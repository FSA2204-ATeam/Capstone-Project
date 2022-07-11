import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentimentAnalysis } from "../store/sentimentAnalysis";

function MyEventReview({ props }) {
  console.log("GRAB MY EVENT?", props);
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState({});
  const analysisResult = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSentimentAnalysis(review, props.id));
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

export default MyEventReview;
