const router = require("express").Router();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const apikey = "WEWmlEac27iUPHQZKSv1aTSCyrZGo6JX1juYkNyxa0Fd";

const url =
  "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/ac94611c-99fa-4a1f-9cea-168ca4361ddb";

router.post("/", async (req, res, send) => {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2022-04-07",
    authenticator: new IamAuthenticator({
      apikey: `${apikey}`,
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

  res.send(
    await naturalLanguageUnderstanding
      .analyze(analyzeParams)
      .then((analysisResults) => {
        console.log("we are in the naturalLanguageUnderstanding component:");
        // console.log(JSON.stringify(analysisResults, null, 2));

        return JSON.stringify(analysisResults, null, 2);
      })
      .catch((err) => {
        console.log("error:", err);
      })
  );
});

module.exports = router;
