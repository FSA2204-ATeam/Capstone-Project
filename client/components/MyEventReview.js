import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentimentAnalysis } from "../store/sentimentAnalysis";
import { fetchUserReviews, setUserEvents } from "../store/usersEvents";
import { Button } from "@material-ui/core";

function MyEventReview({ event }) {
  const user = useSelector((state) => state.auth);
  const update = useSelector((state) => state.usersEvents);
  const analysisResult = useSelector((state) => state.sentiment);
  const [review, setReview] = useState(event.users_events.review);
  const dispatch = useDispatch();
  const eventId = event.id;

  //SPEECH TO TEXT
  const [showMic, setShowMic] = useState(false);
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      setShowMic(true);
    } else {
      console.log("Speech Recognition Not Available");
    }
  });
  let speechRecognition = new webkitSpeechRecognition();
  speechRecognition.lang = "en-US";
  speechRecognition.interimResults = true;
  speechRecognition.onresult = (event) => {
    review
      ? setReview(review + " " + event.results[0][0].transcript)
      : setReview(event.results[0][0].transcript);
  };
  const [mic, setMic] = useState(false);
  //SPEECH TO TEXT ^

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
      <p>
        Please enable microphone access to record your thoughts and feelings
        about the event
      </p>
      <form id="test-review-submit" onSubmit={handleSubmit}>
        <label>
          <input
            name="review"
            type="text"
            placeholder={"Your response here..."}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          {showMic && (
            <Button
              type="button"
              style={{
                borderRadius: 6,
                backgroundColor: "#F0965B",
                padding: "5px 0px",
                fontSize: "10px",
              }}
              onClick={() => {
                {
                  mic
                    ? [speechRecognition.stop(), setMic(false)]
                    : [
                        speechRecognition.start({ continuous: true }),
                        setMic(true),
                      ];
                }
              }}
            >
              {mic ? "Turn Off" : "Turn On"}
            </Button>
          )}
        </label>
        {review ? (
          <Button
            style={{
              backgroundColor: "#377E3F",
              padding: "5px 0px",
              fontSize: "10px",
            }}
            type="submit"
          >
            Update
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: "#377E3F",
              padding: "5px 0px",
              fontSize: "10px",
            }}
            type="submit"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default MyEventReview;
