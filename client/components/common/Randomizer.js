const Randomizer = (dataset) => {
  if (!dataset) return {};

  // let numOfEvents = dataset.length;
  // let random = Math.floor(Math.random() * numOfEvents);

  // return dataset[random];

  // alternative form

  return dataset[Math.floor(Math.random() * dataset.length)];
};

module.exports = Randomizer;

// . events length was 41
// math .random will result in a number such  as 0.4516
// 0.4516 * 41 = 18.51
// math floor rounds down to 18
