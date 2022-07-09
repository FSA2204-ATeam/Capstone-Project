/*

Purpose: To return a random array of element indexes to simulate randomizing an event selection.

Two parameters:
1) number representing the length of an array you want to randomize.
2) desired number of random elements you'd like to draw from the array

Current usage: for seed file to create random associations with user/events

Future usage: possibly could be used to replace the randomizer component?

*/
const uniqueRandomizer = (eventsLength, desiredNumbers) => {
  let bucket = [...Array(eventsLength).keys()];

  for (let i = bucket.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
  }
  return bucket.slice(0, desiredNumbers);
};

module.exports = uniqueRandomizer;
