import API from "./api/index";
import Provider from "./api/provider";
import Store from "./api/store.js";
import TripInfo from "./components/trip-info";
import Menu, {MenuItem} from "./components/menu";
import StatisticsComponent from "./components/statistics";
import FilterController from "./controllers/filter";
import {render, RenderPosition} from "./utils/render";
import TripController from "./controllers/trip";
import Points from "./models/points";
import LoadingComponent from "./components/loading-events";
import {removeComponent} from "./utils/common";
import {FilterType as filters} from "./const";
import {getPointsByFilter} from "./utils/filter";

const AUTHORIZATION = `Basic Llan­fair­pwll­gwyn­gyll­go­ge­rych­rn­dro­bwlll­lan­ty­si­lio­go­go­goch`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new Points();
const loadingComponent = new LoadingComponent();

const siteHeader = document.querySelector(`.trip-main`);
const siteMain = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeader.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMain.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const siteMenu = new Menu();
const tripInfo = new TripInfo(pointsModel);

render(siteHeader, tripInfo, RenderPosition.AFTERBEGIN);
render(siteNavigationMenuHeader, siteMenu, RenderPosition.AFTEREND);
render(siteTripEvents, loadingComponent);

const filterController = new FilterController(siteNavigationMenu, pointsModel);

const tripController = new TripController(siteTripEvents, filterController, pointsModel, apiWithProvider);
apiWithProvider.getData()
  .then((data) => {
    pointsModel.setPoints(data.events);
    pointsModel.setOffersByType(data.offers);
    pointsModel.setDestinations(data.destinations);
    removeComponent(loadingComponent);
    Object.values(filters).map((filter) => {
      const filteredPoints = getPointsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
      if (filteredPoints.length === 0) {
        return filterController.disableEmptyFilter(filter.toLowerCase());
      }
      return filterController.render();
    });
    tripController.renderTripList();
  });

pointsModel.setDataChangeHandler(() => {
  removeComponent(tripInfo);
  render(siteHeader, tripInfo, RenderPosition.AFTERBEGIN);
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {})
    .catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

