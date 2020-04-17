// import {EventTypeOffers} from "./const";

const HALF_OF_RANDOM = 0.5;
// const MAX_OFFERS_COUNT = 3;
const MIN_TWO_DIGIT_NUMBER = 10;

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomBoolean = () => Math.random() > HALF_OF_RANDOM;

const castTimeFormat = (value) => {
  return value < MIN_TWO_DIGIT_NUMBER ? `0${value}` : String(value);
};

const shuffleItems = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomIntegerNumber(1, i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

// const getOffers = (type) => {
//   const currentTypeOffers = EventTypeOffers[type].slice();
//   return currentTypeOffers.splice(0, getRandomIntegerNumber(0, MAX_OFFERS_COUNT));
// };

const checkSuffix = (label) => {
  const modernLabel = label.toUpperCase();
  return modernLabel === `CHECK-IN` ? `CHECK_IN` : modernLabel;
};

export {getRandomItem, getRandomIntegerNumber, getRandomBoolean, castTimeFormat, shuffleItems, checkSuffix};
