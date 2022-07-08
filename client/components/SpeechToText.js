require('babel-polyfill');
import React from 'react';
import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [review, setReview] = useState({});

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    console.log('listening starts');
  });

  const onChange = (e) => {
    e.preventDefault();
    setReview({ [e.target.name]: e.target.value });
    console.log(review);
  };

  return (
    <div>
      <h1>Speech To Text</h1>
      The A-Team
      <textarea value={transcript} onChange={onChange}></textarea>
      <button onClick={resetTranscript}>Clear Review</button>
      <button
        onClick={() => {
          SpeechRecognition.stopListening();
          console.log('listening stops');
        }}
      >
        {' '}
        Stop Listening
      </button>
    </div>
  );
};

export default SpeechToText;
