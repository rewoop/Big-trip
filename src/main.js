import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sort.js";
import {createNewEventTemplate} from "./components/new-event.js";
import {createTripListTemplate} from "./components/trip-list.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createTripEventsTemplate} from "./components/trip-events.js";

const TRIP_DAYS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeaderElement.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createTripInfoTemplate());
render(siteNavigationMenuHeader, createMenuTemplate(), `afterend`);
render(siteNavigationMenu, createFilterTemplate());
render(siteTripEvents, createSortTemplate());
render(siteTripEvents, createNewEventTemplate());
render(siteTripEvents, createTripListTemplate());

const siteTripDaysList = siteMainElement.querySelector(`.trip-days`);

render(siteTripDaysList, createTripDaysTemplate());

const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_DAYS_COUNT; i++) {
  render(siteTripEventsList, createTripEventsTemplate());
}
