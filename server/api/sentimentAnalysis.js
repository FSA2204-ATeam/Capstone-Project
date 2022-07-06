const router = require("express").Router();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const API_KEY = process.env.WATSON_IBM_API_KEY;

const url =
  "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/ac94611c-99fa-4a1f-9cea-168ca4361ddb";

router.post("/", async (req, res, send) => {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2022-04-07",
    authenticator: new IamAuthenticator({
      apikey: `${API_KEY}`,
    }),
    serviceUrl: `${url}`,
  });

  const analyzeParams = {
    // text: `${req.body.whatever}`
    text: "I enjoyed going to the market.",
    features: {
      sentiment: {},
    },
  };

  const {
    result: {
      sentiment: { document },
    },
  } = await naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      return analysisResults;
    })
    .catch((err) => {
      console.error(err);
    });

  res.send(document);
});

module.exports = router;
