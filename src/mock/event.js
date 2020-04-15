import {getRandomItem, getRandomIntegerNumber, shuffleItems} from "../utils";
import {
  EVENT_TYPES,
  CITIES,
  CURRENT_YEAR,
  MIN_MONTH,
  MAX_MONTH,
  MIN_DAY,
  MAX_SUMM_DAY,
  MAX_DAY,
  MIN_HOURS,
  MAX_HOURS,
  MIN_MINUTES,
  MIN_SUMM_MINUTES,
  MAX_MINUTES,
  MIN_EVENT_PRICE,
  MAX_EVENT_PRICE,
  DESCRIPTION_SENTENCES, MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION, EventTypeOffers,
} from "../const";

const getEventTime = () => {
  const startTime = new Date(CURRENT_YEAR, getRandomIntegerNumber(MIN_MONTH, MAX_MONTH), getRandomIntegerNumber(MIN_DAY, MAX_DAY), getRandomIntegerNumber(MIN_HOURS, MAX_HOURS), getRandomIntegerNumber(MIN_MINUTES, MAX_MINUTES));
  const endTime = new Date();

  endTime.setMonth(startTime.getMonth());
  endTime.setDate(startTime.getDate() + getRandomIntegerNumber(0, MAX_SUMM_DAY));
  endTime.setHours(startTime.getHours() + getRandomIntegerNumber(MIN_HOURS, MAX_HOURS));
  endTime.setMinutes(startTime.getMinutes() + getRandomIntegerNumber(MIN_SUMM_MINUTES, MAX_MINUTES));

  return {
    eventStartTime: startTime,
    eventEndTime: endTime
  };
};

const getNewEventForm = () => {
  const getNewDescription = () => {
    return shuffleItems(DESCRIPTION_SENTENCES).slice().splice(0, getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)).join(`\n`);
  };

  const getNewPhotos = () => {
    const photos = [];
    for (let i = 0; i < getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION); i++) {
      photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
    }
    return photos;
  };

  return {
    description: getNewDescription(),
    photos: getNewPhotos(),
    currentCity: getRandomItem(CITIES)
  };
};

const generateTripEvent = () => {
  const currentType = getRandomItem(EVENT_TYPES);
  const getCurrentEventType = (type) => {
    return {
      icon: type.toLowerCase(),
      label: type
    };
  };

  return {
    type: currentType,
    city: getRandomItem(CITIES),
    time: getEventTime(),
    price: getRandomIntegerNumber(MIN_EVENT_PRICE, MAX_EVENT_PRICE),
    offers: EventTypeOffers[currentType].slice(),
    newEventForm: getNewEventForm(),
    newEventType: getCurrentEventType(currentType)
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvents};
