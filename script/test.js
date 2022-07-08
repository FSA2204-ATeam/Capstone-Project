const axios = require("axios");

const testFunc = async (string) => {
  try {
    const request = await axios.post("/api/sentimentAnalysis", null, {
      headers: { review: "I like testing things with javascript" },
    });
    console.log(request);
  } catch (err) {
    console.error(err);
  }
};

testFunc();

module.exports = testFunc;
