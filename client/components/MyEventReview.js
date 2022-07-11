import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentimentAnalysis } from "../store/sentimentAnalysis";

function MyEventReview({ props }) {
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
      <h3>My Review</h3>
      <p>Please fill enter your thoughts and feelings about the event</p>
      <form id="test-review-submit" onSubmit={handleSubmit}>
        <label>
          Review:
          <input
            name="review"
            type="text"
            placeholder="Your response here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <p></p>
    </div>
  );
}

export default MyEventReview;
