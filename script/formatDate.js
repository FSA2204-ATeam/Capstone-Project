const formatDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

module.exports = formatDate;
