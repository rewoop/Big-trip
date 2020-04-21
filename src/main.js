import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import Filter from "./components/filter";
import TripList from "./components/trip-list";
import {generateTripEvents} from "./mock/event";
import {render, RenderPosition} from "./utils/render";
import TripController from "./controllers/TripController";

const TRIP_DAYS_COUNT = 22;
const tripEvents = generateTripEvents(TRIP_DAYS_COUNT);

const siteHeader = document.querySelector(`.trip-main`);
const siteMain = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeader.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMain.querySelector(`.trip-events`);

const reduceEventItems = tripEvents.reduce((days, item) => {
  const time = item.time.eventStartTime.toJSON().slice(5, 10);
  days[time] = days[time] || [];
  days[time].push(item);
  return days;
}, {});

const groupEventItems = Object.keys(reduceEventItems).map((day) => {
  return {
    day,
    items: reduceEventItems[day]
  };
}).sort((a, b) => a.day > b.day ? 1 : -1);

render(siteHeader, new TripInfo(), RenderPosition.BEFOREEND);
render(siteNavigationMenuHeader, new Menu(), RenderPosition.AFTEREND);
render(siteNavigationMenu, new Filter(), RenderPosition.BEFOREEND);

const tripList = new TripList();
const tripController = new TripController(tripList);

render(siteTripEvents, tripList, RenderPosition.BEFOREEND);
tripController.render(groupEventItems, siteTripEvents);
