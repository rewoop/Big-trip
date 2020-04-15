import {createTripInfoTemplate} from "./components/trip-info";
import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createNewEventTemplate} from "./components/new-event";
import {createTripListTemplate} from "./components/trip-list";
import {createTripDaysTemplate} from "./components/trip-days";
import {generateTripEvents} from "./mock/event";
// import {createTripEventsTemplate} from "./components/trip-events";


const TRIP_DAYS_COUNT = 22;
const tripEvents = generateTripEvents(TRIP_DAYS_COUNT);

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeaderElement.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// const createCurrentTripEvents = () => {
//   return tripEvents.map((it) => {
//     return createTripEventsTemplate(it);
//   }).join(`\n`);
// };

const reduceEventItems = tripEvents.reduce((days, item) => {
  const time = item.time.eventStartTime.toJSON().slice(8, 10);
  days[time] = days[time] || [];
  days[time].push(item);
  return days;
}, {});

const groupEventItems = Object.keys(reduceEventItems).map((day) => {
  return {
    day,
    item: reduceEventItems[day]
  };
}).sort((a, b) => a.day - b.day);

//   .reduce((month, item) => {
//     month[item.currentMonth] = month[item.currentMonth] || [];
//     month[item.currentMonth].push(item);
//     return month;
//   }, {});
//
// const groupEventDaysByMonth = Object.keys(groupEventItems).map((day) => {
//   return {
//     day,
//     item: groupEventItems[day]
//   };
// }).sort((a, b) => a.day - b.day);

const createCurrentTripDays = () => {
  return groupEventItems.map((item, index) => {
    return createTripDaysTemplate(item, index);
  }).join(`\n`);
};

render(siteHeaderElement, createTripInfoTemplate());
render(siteNavigationMenuHeader, createMenuTemplate(), `afterend`);
render(siteNavigationMenu, createFilterTemplate());
render(siteTripEvents, createSortTemplate());
render(siteTripEvents, createNewEventTemplate(tripEvents[0]));
render(siteTripEvents, createTripListTemplate());

const siteTripDaysList = siteMainElement.querySelector(`.trip-days`);

render(siteTripDaysList, createCurrentTripDays());

// const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);
//
// render(siteTripEventsList, createCurrentTripEvents());
