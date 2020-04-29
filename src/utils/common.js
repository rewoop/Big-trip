import moment from "moment";

const HALF_OF_RANDOM = 0.5;

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomBoolean = () => Math.random() > HALF_OF_RANDOM;

const shuffleItems = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomIntegerNumber(1, i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

const checkSuffix = (label) => {
  const modernLabel = label.toUpperCase();
  return modernLabel === `CHECK-IN` ? `CHECK_IN` : modernLabel;
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};

const getDurationDate = (startDate, endDate) => {
  return moment.duration(moment(endDate).diff(moment(startDate)));
};

export {getRandomItem, getRandomIntegerNumber, getRandomBoolean, shuffleItems, checkSuffix, formatTime, formatDate, getDurationDate};
