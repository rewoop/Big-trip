const HALF_OF_RANDOM = 0.5;
const MIN_TWO_DIGIT_NUMBER = 10;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

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

const checkSuffix = (label) => {
  const modernLabel = label.toUpperCase();
  return modernLabel === `CHECK-IN` ? `CHECK_IN` : modernLabel;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {getRandomItem, getRandomIntegerNumber, getRandomBoolean, castTimeFormat, shuffleItems, checkSuffix, createElement, render, RenderPosition};
