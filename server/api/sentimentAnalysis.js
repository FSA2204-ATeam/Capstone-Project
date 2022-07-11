const router = require("express").Router();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const { requireToken, isAdmin } = require("../api/gateKeepingMiddleware");
const {
  models: { Event, User, UsersEvents },
} = require("../db");

router.post("/", async (req, res, next) => {
  const API_KEY = process.env.WATSON_IBM_API_KEY;

  const url =
    "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/ac94611c-99fa-4a1f-9cea-168ca4361ddb";

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2022-04-07",
    authenticator: new IamAuthenticator({
      apikey: `${API_KEY}`,
    }),
    serviceUrl: `${url}`,
  });

  const analyzeParams = {
    text: `${req.headers.review}`,
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

router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const user = await User.findByToken(req.headers.authorization);
    const updated = await UsersEvents.update(
      {
        review: req.body.review,
        sentimentScore: req.body.score,
        sentimentLabel: req.body.label,
      },
      { where: { eventId: req.body.eventId, userId: user.id } }
    );
    console.log("DID I UPDATE?", updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
