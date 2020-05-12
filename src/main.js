import API from "./api";
import TripInfo from "./components/trip-info";
import Menu, {MenuItem} from "./components/menu";
import StatisticsComponent from "./components/statistics";
import FilterController from "./controllers/filter";
import {render, RenderPosition} from "./utils/render";
import TripController from "./controllers/trip";
import Points from "./models/points";

const AUTHORIZATION = `Basic Llan­fair­pwll­gwyn­gyll­go­ge­rych­wyrn­dro­bwll­llan­ty­si­lio­go­go­goch`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new Points();

const siteHeader = document.querySelector(`.trip-main`);
const siteMain = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeader.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMain.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const siteMenu = new Menu();

render(siteHeader, new TripInfo(), RenderPosition.AFTERBEGIN);
render(siteNavigationMenuHeader, siteMenu, RenderPosition.AFTEREND);

const filterController = new FilterController(siteNavigationMenu, pointsModel);
filterController.render();
const tripController = new TripController(siteTripEvents, pointsModel);
api.getData()
  .then((data) => {
    pointsModel.setPoints(data.events);
    pointsModel.setOffersByType(data.offers);
    pointsModel.setDestinations(data.destinations);
    tripController.renderTripList();
  });

newEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterController.setDefaultView(true);
  tripController.createPoint(newEventButton);
});

const statisticsComponent = new StatisticsComponent({points: pointsModel});
render(siteTripEvents, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

siteMenu.setOnChange((menuItem) => {
  const setCurrentView = (menu, oldElement, newElement) => {
    siteMenu.setActiveItem(menu);
    filterController.setDefaultView(menu);
    oldElement.hide();
    newElement.show();
  };

  switch (menuItem) {
    case MenuItem.TABLE:
      setCurrentView(MenuItem.TABLE, statisticsComponent, tripController);
      newEventButton.removeAttribute(`disabled`);
      break;
    case MenuItem.STATISTICS:
      setCurrentView(MenuItem.STATISTICS, tripController, statisticsComponent);
      newEventButton.setAttribute(`disabled`, `disabled`);
      break;
  }
});

