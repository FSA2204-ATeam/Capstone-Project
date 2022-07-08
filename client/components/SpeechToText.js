// {
//   "apikey": "uA7foGkj-v6L7nAuLA5UYN90rb5R1BbnAhX5NbRWeBC8",
//   "iam_apikey_description": "Auto-generated for key crn:v1:bluemix:public:speech-to-text:us-east:a/8312362d6cf74163ae2b250c08504264:e9f637d7-f1a5-4156-a5b5-1ed1066e9a8c:resource-key:fc54f253-3698-47ac-912d-54d8f8c0a6a4",
//   "iam_apikey_name": "Auto-generated service credentials",
//   "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
//   "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/8312362d6cf74163ae2b250c08504264::serviceid:ServiceId-405c69f2-451d-4b02-adad-3d6e617c22bc",
//   "url": "https://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/e9f637d7-f1a5-4156-a5b5-1ed1066e9a8c"
// }
// const API_KEY2 = process.env.WATSON_IBM_API_KEY2;
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({
//     apikey: `${API_KEY2}`,
//   }),
//   serviceUrl: 'https://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/e9f637d7-f1a5-4156-a5b5-1ed1066e9a8c',
//   // disableSslVerification: true, //If run into verification problems later, this will disable ssl verification
// });

// speechToText.method(params)
//   .catch(err => {
//     console.error('error:', err);
//   });

// const fs = require('fs');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

// const params = {
//   objectMode: true,
//   contentType: 'audio/flac',
//   model: 'en-US_BroadbandModel',
//   keywords: ['colorado', 'tornado', 'tornadoes'],
//   keywordsThreshold: 0.5,
//   maxAlternatives: 3,
// };

// // Create the stream.
// const recognizeStream = speechToText.recognizeUsingWebSocket(params);

// // Pipe in the audio.
// fs.createReadStream('audio-file.flac').pipe(recognizeStream);

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
