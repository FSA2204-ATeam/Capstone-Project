const Randomizer = (dataset) => {
  let numOfEvents = dataset.length;
  let random = Math.floor(Math.random() * numOfEvents);

  return dataset[random];
};

module.exports = Randomizer;
