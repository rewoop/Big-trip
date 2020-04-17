import {getRandomBoolean, getRandomIntegerNumber, getRandomItem, shuffleItems} from "../utils";
import {
  CITIES,
  CURRENT_YEAR,
  DESCRIPTION_SENTENCES,
  EVENT_TYPES,
  EventTypeOffers,
  MAX_COUNT_DESCRIPTION,
  MAX_DAY,
  MAX_EVENT_PRICE,
  MAX_HOURS,
  MAX_MINUTES,
  MAX_MONTH,
  MAX_SUMM_DAY,
  MIN_COUNT_DESCRIPTION,
  MIN_DAY,
  MIN_EVENT_PRICE,
  MIN_HOURS,
  MIN_MINUTES,
  MIN_MONTH,
  MIN_SUMM_MINUTES,
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

const getNewEventForm = (city) => {
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
    currentCity: city
  };
};

const generateTripEvent = () => {
  const currentType = getRandomItem(EVENT_TYPES);
  const currentCity = getRandomItem(CITIES);
  const getCurrentEventType = (type) => {
    return {
      icon: type.toLowerCase(),
      label: type
    };
  };

  const getCurrentOffers = () => {
    return EventTypeOffers[currentType].map((offer) => {
      offer.required = getRandomBoolean();
      return offer;
    });
  };

  return {
    type: currentType,
    city: currentCity,
    time: getEventTime(),
    price: getRandomIntegerNumber(MIN_EVENT_PRICE, MAX_EVENT_PRICE),
    offers: getCurrentOffers(),
    newEventForm: getNewEventForm(currentCity),
    newEventType: getCurrentEventType(currentType)
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvents};
