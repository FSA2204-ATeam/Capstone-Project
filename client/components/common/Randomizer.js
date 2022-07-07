const Randomizer = (dataset) => {
  if (!dataset) return {};

  return dataset[Math.floor(Math.random() * dataset.length)];
};

module.exports = Randomizer;
