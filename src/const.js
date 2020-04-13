import {getRandomIntegerNumber} from "./utils";

const MIN_OFFER_COST = 10;
const MAX_OFFER_COST = 200;
const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 6;
const CURRENT_YEAR = 2020;
const MIN_MONTH = 0;
const MAX_MONTH = 11;
const MIN_DAY = 1;
const MAX_SUMM_DAY = 2;
const MAX_DAY = 31;
const MIN_HOURS = 0;
const MAX_HOURS = 24;
const MIN_MINUTES = 0;
const MIN_SUMM_MINUTES = 20;
const MAX_MINUTES = 60;
const TRANSFER_EVENTS = 7;
const ACTIVITY_EVENTS = 10;
const MIN_EVENT_PRICE = 100;
const MAX_EVENT_PRICE = 2000;
const DEFAULT_EXTRA_HOURS = 3;
const DEFAULT_EXTRA_DAYS = 1;
const MAX_OFFERS_COUNT = 5;
const MAX_ISO_STRING_LENGTH = 16;

const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const eventTypesMap = {
  'Taxi': `Taxi to `,
  'Bus': `Bus to `,
  'Train': `Train to `,
  'Ship': `Ship to `,
  'Transport': `Transport to `,
  'Drive': `Drive to `,
  'Flight': `Flight to `,
  'Check-in': `Check-in in `,
  'Sightseeing': `Sightseeing in `,
  'Restaurant': `Restaurant in `
};

const CITIES = [
  `Paris`,
  `Rome`,
  `Amsterdam`,
  `Irkutsk`,
  `Tokyo`
];

const offers = [{
  title: `Order Uber`,
  price: getRandomIntegerNumber(MIN_OFFER_COST, MAX_OFFER_COST)
},
{
  title: `Add luggage`,
  price: getRandomIntegerNumber(MIN_OFFER_COST, MAX_OFFER_COST)
},
{
  title: `Switch to comfort class`,
  price: getRandomIntegerNumber(MIN_OFFER_COST, MAX_OFFER_COST)
},
{
  title: `Add meal`,
  price: getRandomIntegerNumber(MIN_OFFER_COST, MAX_OFFER_COST)
},
{
  title: `Choose seats`,
  price: getRandomIntegerNumber(MIN_OFFER_COST, MAX_OFFER_COST)
}];

const DESCRIPTION_TEXT = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

export {EVENT_TYPES, eventTypesMap, CITIES, offers, DESCRIPTION_TEXT, MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION, CURRENT_YEAR, MIN_MONTH, MAX_MONTH, MIN_DAY, MAX_SUMM_DAY, MAX_DAY, MIN_HOURS, MAX_HOURS, MIN_MINUTES, MIN_SUMM_MINUTES, MAX_MINUTES, TRANSFER_EVENTS, ACTIVITY_EVENTS, MIN_EVENT_PRICE, MAX_EVENT_PRICE, DEFAULT_EXTRA_HOURS, DEFAULT_EXTRA_DAYS, MAX_OFFERS_COUNT, MAX_ISO_STRING_LENGTH};
