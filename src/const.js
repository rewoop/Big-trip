const TRANSFER_EVENTS = 7;
const ACTIVITY_EVENTS = 10;
const MAX_ISO_STRING_LENGTH = 16;
const MAX_SHOWING_OFFERS = 3;
const FIRST_DAY_COUNTER = 1;
const SHAKE_ANIMATION_TIMEOUT = 600;
const HIDDEN_CLASS = `visually-hidden`;
const FILTER_ID_PREFIX = `filter-`;
const BAR_HEIGHT = 55;
const AUTHORIZATION = `Basic Llan­fair­pwll­gwyn­gyll­go­ge­rych­rnro­bwlll­l­ty­si­lio­go­goch`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const monthMap = new Map([
  [0, `JAN`],
  [1, `FEB`],
  [2, `MAR`],
  [3, `APR`],
  [4, `MAY`],
  [5, `JUN`],
  [6, `JUL`],
  [7, `AUG`],
  [8, `SEP`],
  [9, `OCT`],
  [10, `NOV`],
  [11, `DEC`],
]);

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

const iconMap = {
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

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};

const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export {HIDDEN_CLASS, FILTER_ID_PREFIX, monthMap, EVENT_TYPES, EventSuffix, TRANSFER_EVENTS, ACTIVITY_EVENTS, MAX_ISO_STRING_LENGTH, MAX_SHOWING_OFFERS, FIRST_DAY_COUNTER, FilterType, iconMap, SHAKE_ANIMATION_TIMEOUT, DefaultData, Method, MenuItem, SortType, BAR_HEIGHT, Mode, RenderPosition, AUTHORIZATION, END_POINT, STORE_NAME};
