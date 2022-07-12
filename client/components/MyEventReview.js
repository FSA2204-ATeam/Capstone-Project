import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentimentAnalysis } from "../store/sentimentAnalysis";

function MyEventReview({ myReview }) {
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState({});
  const analysisResult = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("REVIEW COMPONENT event", event);
    dispatch(getSentimentAnalysis(review, event.id));
  };

  return (
    <div>
      <h3>My Review</h3>
      <p>Please fill enter your thoughts and feelings about the event</p>
      <form id="test-review-submit" onSubmit={handleSubmit}>
        <label>
          <input
            name="review"
            type="text"
            placeholder={myReview ? myReview : "Your response here..."}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MyEventReview;
