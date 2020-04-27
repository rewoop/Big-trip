import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import Filter from "./components/filter";
import {generateTripEvents} from "./mock/event";
import {render, RenderPosition} from "./utils/render";
import Trip from "./controllers/trip";

const TRIP_DAYS_COUNT = 22;
const tripEvents = generateTripEvents(TRIP_DAYS_COUNT);

const siteHeader = document.querySelector(`.trip-main`);
const siteMain = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeader.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMain.querySelector(`.trip-events`);

render(siteHeader, new TripInfo(), RenderPosition.AFTERBEGIN);
render(siteNavigationMenuHeader, new Menu(), RenderPosition.AFTEREND);
render(siteNavigationMenu, new Filter());

const tripController = new Trip(siteTripEvents);
tripController.renderTripList(tripEvents);
