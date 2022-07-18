import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSentimentAnalysis } from '../store/sentimentAnalysis';
import { fetchUserReviews, setUserEvents } from '../store/usersEvents';

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
    if ('webkitSpeechRecognition' in window) {
      setShowMic(true);
    } else {
      console.log('Speech Recognition Not Available');
    }
  });
  let speechRecognition = new webkitSpeechRecognition();
  speechRecognition.lang = 'en-US';
  speechRecognition.interimResults = true;
  speechRecognition.onresult = (event) => {
    review
      ? setReview(review + ' ' + event.results[0][0].transcript)
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
      <p>Please fill enter your thoughts and feelings about the event</p>
      <form id="test-review-submit" onSubmit={handleSubmit}>
        <label>
          <input
            name="review"
            type="text"
            placeholder={'Your response here...'}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          {showMic && (
            <button
              type="button"
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
              {mic ? 'Mic On' : 'Mic Off'}
            </button>
          )}
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
