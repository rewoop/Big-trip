import {getRandomItem, getRandomIntegerNumber, shuffleItems} from "../utils";
import {EVENT_TYPES, CITIES, offers, CURRENT_YEAR, MIN_MONTH, MAX_MONTH, MIN_DAY, MAX_SUMM_DAY, MAX_DAY, MIN_HOURS, MAX_HOURS, MIN_MINUTES, MIN_SUMM_MINUTES, MAX_MINUTES, MIN_EVENT_PRICE, MAX_EVENT_PRICE, DEFAULT_EXTRA_HOURS, DEFAULT_EXTRA_DAYS, MAX_OFFERS_COUNT} from "../const";

const eventTime = () => {
  const startTime = new Date(CURRENT_YEAR, getRandomIntegerNumber(MIN_MONTH, MAX_MONTH), getRandomIntegerNumber(MIN_DAY, MAX_DAY), getRandomIntegerNumber(MIN_HOURS, MAX_HOURS), getRandomIntegerNumber(MIN_MINUTES, MAX_MINUTES));
  const endTime = new Date();

  endTime.setMonth(startTime.getMonth());
  endTime.setDate(startTime.getDate() + getRandomIntegerNumber(0, MAX_SUMM_DAY));
  endTime.setHours(startTime.getHours() + getRandomIntegerNumber(MIN_HOURS, MAX_HOURS));
  endTime.setMinutes(startTime.getMinutes() + getRandomIntegerNumber(MIN_SUMM_MINUTES, MAX_MINUTES));

  const durationTime = () => {
    const duration = new Date(endTime - startTime);
    return {
      minutes: duration.getMinutes(),
      hours: duration.getHours() - DEFAULT_EXTRA_HOURS,
      days: duration.getDate() - DEFAULT_EXTRA_DAYS
    };
  };

  return {
    eventStartTime: startTime,
    duration: durationTime(),
    eventEndTime: endTime
  };
};

const getRandomOffers = () => {
  return shuffleItems(offers).slice().splice(0, getRandomIntegerNumber(0, MAX_OFFERS_COUNT));
};

const generateTripEvent = () => {
  return {
    type: getRandomItem(EVENT_TYPES),
    city: getRandomItem(CITIES),
    time: eventTime(),
    price: getRandomIntegerNumber(MIN_EVENT_PRICE, MAX_EVENT_PRICE),
    offers: getRandomOffers(),
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvents, getRandomOffers};
