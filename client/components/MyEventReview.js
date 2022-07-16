import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentimentAnalysis } from "../store/sentimentAnalysis";
import { fetchUserReviews, setUserEvents } from "../store/usersEvents";

function MyEventReview({ event }) {
  const user = useSelector((state) => state.auth);
  const update = useSelector((state) => state.usersEvents);
  const analysisResult = useSelector((state) => state.sentiment);
  const [review, setReview] = useState(event.users_events.review);
  const dispatch = useDispatch();
  const eventId = event.id;

  useEffect(() => {
    dispatch(setUserEvents(user.id));
  }, [analysisResult]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSentimentAnalysis(review, eventId));
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
            placeholder={"Your response here..."}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        {review ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default MyEventReview;
