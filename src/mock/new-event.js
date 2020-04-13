import {shuffleItems, getRandomIntegerNumber, castTimeFormat} from "../utils";
import {EVENT_TYPES, eventTypesMap, DESCRIPTION_TEXT, MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION, CURRENT_YEAR, MIN_MONTH, MAX_MONTH, MIN_DAY, MAX_SUMM_DAY, MAX_DAY, MIN_HOURS, MAX_HOURS, MIN_MINUTES, MIN_SUMM_MINUTES, MAX_MINUTES} from "../const";
import {getRandomItem} from "../utils";

const getNewDescription = () => {
  return shuffleItems(DESCRIPTION_TEXT).slice().splice(0, getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION));
};

const getNewPhotos = () => {
  let photos = [];
  for (let i = 0; i < getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const getEventTime = () => {
  const startTime = new Date(CURRENT_YEAR, getRandomIntegerNumber(MIN_MONTH, MAX_MONTH), getRandomIntegerNumber(MIN_DAY, MAX_DAY), getRandomIntegerNumber(MIN_HOURS, MAX_HOURS), getRandomIntegerNumber(MIN_MINUTES, MAX_MINUTES));
  const endTime = new Date();

  endTime.setMonth(startTime.getMonth());
  endTime.setDate(startTime.getDate() + getRandomIntegerNumber(0, MAX_SUMM_DAY));
  endTime.setHours(startTime.getHours() + getRandomIntegerNumber(MIN_HOURS, MAX_HOURS));
  endTime.setMinutes(startTime.getMinutes() + getRandomIntegerNumber(MIN_SUMM_MINUTES, MAX_MINUTES));

  const eventStartTime = `${castTimeFormat(startTime.getDate())}/${castTimeFormat(startTime.getMonth())}/${String(startTime.getFullYear()).slice(2)} ${castTimeFormat(startTime.getHours())}:${castTimeFormat(startTime.getMinutes())}`;
  const eventEndTime = `${castTimeFormat(endTime.getDate())}/${castTimeFormat(endTime.getMonth())}/${String(endTime.getFullYear()).slice(2)} ${castTimeFormat(endTime.getHours())}:${castTimeFormat(endTime.getMinutes())}`;

  return {
    eventStartTime,
    eventEndTime
  };
};

const getCurrentEventType = () => {
  const currentType = getRandomItem(EVENT_TYPES);

  return {
    icon: currentType.toLowerCase(),
    label: eventTypesMap[currentType]
  };
};

const generateNewEvent = () => {
  return {
    description: getNewDescription(),
    photos: getNewPhotos(),
    types: EVENT_TYPES,
    time: getEventTime(),
    currentEventType: getCurrentEventType()
  };
};

export {generateNewEvent};
