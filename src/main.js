import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import Filter from "./components/filter";
import Sort from "./components/sort";
import NewEvent from "./components/new-event";
import TripList from "./components/trip-list";
import TripDays from "./components/trip-days";
import TripEvents from "./components/trip-events";
import {generateTripEvents} from "./mock/event";
import {render, RenderPosition} from "./utils";

const TRIP_DAYS_COUNT = 22;
const tripEvents = generateTripEvents(TRIP_DAYS_COUNT);

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);
const siteNavigationMenu = siteHeaderElement.querySelector(`.trip-controls`);
const siteNavigationMenuHeader = siteNavigationMenu.querySelector(`h2`);
const siteTripEvents = siteMainElement.querySelector(`.trip-events`);

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

render(siteHeaderElement, new TripInfo().getElement(), RenderPosition.BEFOREEND);
render(siteNavigationMenuHeader, new Menu().getElement(), RenderPosition.AFTEREND);
render(siteNavigationMenu, new Filter().getElement(), RenderPosition.BEFOREEND);
render(siteTripEvents, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteTripEvents, new TripList().getElement(), RenderPosition.BEFOREEND);

const siteTripDaysList = siteMainElement.querySelector(`.trip-days`);

const renderTripEvents = (eventsList, container) => {
  const replaceEventToEdit = (form, event) => {
    container.replaceChild(form, event);
  };

  const replaceEditToEvent = (form, event) => {
    container.replaceChild(event, form);
  };

  eventsList.items.forEach((tripEvent) => {
    const currentEvent = new TripEvents(tripEvent);
    const eventEditComponent = new NewEvent(tripEvent);
    render(container, currentEvent.getElement(), RenderPosition.BEFOREEND);

    const eventRollupBtn = currentEvent.getElement().querySelector(`.event__rollup-btn`);
    eventRollupBtn.addEventListener(`click`, () => {
      replaceEventToEdit(eventEditComponent.getElement(), currentEvent.getElement());
    });

    const editForm = eventEditComponent.getElement();
    editForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceEditToEvent(eventEditComponent.getElement(), currentEvent.getElement());
    });
  });
};

const renderTripDays = () => {
  groupEventItems.forEach((items, index) => {
    const tripDay = new TripDays(items, index);
    render(siteTripDaysList, tripDay.getElement(), RenderPosition.BEFOREEND);
    const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
    renderTripEvents(items, tripEventsList);
  });
};

renderTripDays();


