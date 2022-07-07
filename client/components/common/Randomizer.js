const Randomizer = (dataset) => {
  if (!dataset) return {};

  let numOfEvents = dataset.length;
  let random = Math.floor(Math.random() * numOfEvents);

  return dataset[random];
};

module.exports = Randomizer;
