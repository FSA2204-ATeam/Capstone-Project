const uniqueRandomizer = (eventsLength, desiredNumbers) => {
  let bucket = [...Array(eventsLength).keys()];

  for (let i = bucket.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
  }
  console.log(bucket.slice(0, desiredNumbers));
};

module.exports = uniqueRandomizer;
