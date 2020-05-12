const TRANSFER_EVENTS = 7;
const ACTIVITY_EVENTS = 10;
const MAX_ISO_STRING_LENGTH = 16;
const MAX_SHOWING_OFFERS = 3;
const FIRST_DAY_COUNTER = 1;
const SHAKE_ANIMATION_TIMEOUT = 600;
const HIDDEN_CLASS = `visually-hidden`;

const EventType = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECK_IN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`
};

const EVENT_TYPES = Object.values(EventType);

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

const IconMap = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export {HIDDEN_CLASS, EVENT_TYPES, EventSuffix, TRANSFER_EVENTS, ACTIVITY_EVENTS, MAX_ISO_STRING_LENGTH, MAX_SHOWING_OFFERS, FIRST_DAY_COUNTER, FilterType, IconMap, SHAKE_ANIMATION_TIMEOUT};
