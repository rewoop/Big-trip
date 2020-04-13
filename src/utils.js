const HALF_OF_RANDOM = 0.5;
const MIN_TWO_DIGIT_NUMBER = 10;

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getBoolean = () => Math.random() > HALF_OF_RANDOM;

const castTimeFormat = (value) => {
  return value < MIN_TWO_DIGIT_NUMBER ? `0${value}` : String(value);
};

const shuffleItems = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

export {getRandomItem, getRandomIntegerNumber, castTimeFormat, shuffleItems, getBoolean};
