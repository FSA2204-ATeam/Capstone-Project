const formatDate = (offset = 1) => {
  const friendlyDate = (date) => {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  let searchStart = new Date();
  searchStart.setHours(0, 0, 0, 0);
  startDate = friendlyDate(searchStart);
  let searchEnd = new Date();
  searchEnd.setHours(0, 0, 0, 0);
  searchEnd.setDate(searchEnd.getDate() + offset);
  endDate = friendlyDate(searchEnd);

  return [searchStart, searchEnd, startDate, endDate];
};

module.exports = formatDate;
