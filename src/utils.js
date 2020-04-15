import {EventTypeOffers} from "./const";

const HALF_OF_RANDOM = 0.5;
const MIN_TWO_DIGIT_NUMBER = 10;
const MAX_OFFERS_COUNT = 3;

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

const getOffers = (type) => {
  const currentTypeOffers = EventTypeOffers[type].slice();
  return currentTypeOffers.splice(0, getRandomIntegerNumber(0, MAX_OFFERS_COUNT));
};

const checkSuffix = (label) => {
  let modernLabel = label.toUpperCase();
  if (modernLabel === `CHECK-IN`) {
    return `CHECK_IN`;
  }
  return modernLabel;
};

export {getRandomItem, getRandomIntegerNumber, castTimeFormat, shuffleItems, getRandomBoolean, getOffers, checkSuffix};
