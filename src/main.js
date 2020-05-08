import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import FilterController from "./controllers/filter";
import {generateTripEvents} from "./mock/event";
import {render, RenderPosition} from "./utils/render";
import TripController from "./controllers/trip";
import Points from "./models/points";

const TRIP_DAYS_COUNT = 22;
const tripEvents = generateTripEvents(TRIP_DAYS_COUNT);
const pointsModel = new Points();
pointsModel.setPoints(tripEvents);

const siteHeader = document.querySelector(`.trip-main`);
const siteMain = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeader.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMain.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

render(siteHeader, new TripInfo(), RenderPosition.AFTERBEGIN);
render(siteNavigationMenuHeader, new Menu(), RenderPosition.AFTEREND);

const filterController = new FilterController(siteNavigationMenu, pointsModel);
filterController.render();

const tripController = new TripController(siteTripEvents, pointsModel);
tripController.renderTripList();

newEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterController.setDefaultView();
  tripController.createPoint(newEventButton);
});
