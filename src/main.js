import {createTripInfoTemplate} from "./components/trip-info";
import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createNewEventTemplate} from "./components/new-event";
import {createTripListTemplate} from "./components/trip-list";
import {createTripDaysTemplate} from "./components/trip-days";
import {createTripEventsTemplate} from "./components/trip-events";
import {generateTripEvents} from "./mock/event";
import {generateNewEvent} from "./mock/new-event";

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

render(siteHeaderElement, createTripInfoTemplate());
render(siteNavigationMenuHeader, createMenuTemplate(), `afterend`);
render(siteNavigationMenu, createFilterTemplate());
render(siteTripEvents, createSortTemplate());
render(siteTripEvents, createNewEventTemplate(generateNewEvent()));
render(siteTripEvents, createTripListTemplate());

const siteTripDaysList = siteMainElement.querySelector(`.trip-days`);

render(siteTripDaysList, createTripDaysTemplate());

const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

tripEvents.slice().map((it) => render(siteTripEventsList, createTripEventsTemplate(it))).join(`/n`);
