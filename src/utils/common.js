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

const formatString = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};

const formatDateToDefault = (date) => {
  moment.defaultFormat = `DD.MM.YYYY HH:mm`;
  return moment(date, moment.defaultFormat).toDate();
};

const getDurationDate = (startDate, endDate) => {
  return moment.duration(moment(endDate).diff(moment(startDate)));
};

const isFutureDate = (nowDate, eventStartDate) => {
  return eventStartDate > nowDate && !isOneDay(nowDate, eventStartDate);
};

const isPastDate = (nowDate, eventStartDate) => {
  return eventStartDate < nowDate && !isOneDay(nowDate, eventStartDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export {getRandomItem, getRandomIntegerNumber, getRandomBoolean, shuffleItems, checkSuffix, formatTime, formatDate, getDurationDate, isFutureDate, isPastDate, formatDateToDefault, formatString};
