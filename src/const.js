const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 6;
const CURRENT_YEAR = 2020;
const MIN_MONTH = 1;
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
const MAX_ISO_STRING_LENGTH = 16;
const MAX_SHOWING_OFFERS = 3;
const FIRST_DAY_COUNTER = 1;

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

const EventSuffix = {
  TAXI: `to `,
  BUS: `to `,
  TRAIN: `to `,
  SHIP: `to `,
  TRANSPORT: `to `,
  DRIVE: `to `,
  FLIGHT: `to `,
  CHECK_IN: `in `,
  SIGHTSEEING: `in `,
  RESTAURANT: `in `
};

const CITIES = [
  `Paris`,
  `Rome`,
  `Amsterdam`,
  `Irkutsk`,
  `Tokyo`
];

const EventTypeOffers = {
  'Taxi': [
    {
      id: `uber`,
      title: `Order Uber`,
      price: 20,
      required: true
    }
  ],
  'Bus': [
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
      required: true
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
      required: false
    }
  ],
  'Train': [
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
      required: true
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
      required: false
    }
  ],
  'Ship': [
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
      required: true
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
      required: false
    }
  ],
  'Transport': [
    {
      id: `train`,
      title: `Travel by train`,
      price: 40,
      required: true
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
      required: false
    }
  ],
  'Drive': [
    {
      id: `car`,
      title: `Rent a car`,
      price: 200,
      required: true
    }
  ],
  'Flight': [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
      required: true
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
      required: false
    }
  ],
  'Check-in': [
    {
      id: `breakfast`,
      title: `Add breakfast`,
      price: 50,
      required: true
    }
  ],
  'Sightseeing': [
    {
      id: `tickets`,
      title: `Book tickets`,
      price: 40,
      required: true
    },
    {
      id: `lunch`,
      title: `Lunch in city`,
      price: 30,
      required: false
    }
  ],
  'Restaurant': [
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
      required: false
    }
  ]
};

const DESCRIPTION_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

export {EVENT_TYPES, EventSuffix, CITIES, EventTypeOffers, DESCRIPTION_SENTENCES, MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION, CURRENT_YEAR, MIN_MONTH, MAX_MONTH, MIN_DAY, MAX_SUMM_DAY, MAX_DAY, MIN_HOURS, MAX_HOURS, MIN_MINUTES, MIN_SUMM_MINUTES, MAX_MINUTES, TRANSFER_EVENTS, ACTIVITY_EVENTS, MIN_EVENT_PRICE, MAX_EVENT_PRICE, DEFAULT_EXTRA_HOURS, DEFAULT_EXTRA_DAYS, MAX_ISO_STRING_LENGTH, MAX_SHOWING_OFFERS, FIRST_DAY_COUNTER};
