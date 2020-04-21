import TripInfo from "./components/trip-info";
import Menu from "./components/menu";
import Filter from "./components/filter";
import Sort from "./components/sort";
import NewEvent from "./components/new-event";
import TripList from "./components/trip-list";
import TripDay from "./components/trip-days";
import TripEvents from "./components/trip-events";
import NoTripDays from "./components/no-trip-days";
import {generateTripEvents} from "./mock/event";
import {render, RenderPosition, replace} from "./utils/render";

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

const renderTripEvents = (eventsList, container) => {
  eventsList.items.forEach((tripEvent) => {
    const currentEvent = new TripEvents(tripEvent);
    const eventEditComponent = new NewEvent(tripEvent);
    render(container, currentEvent, RenderPosition.BEFOREEND);

    const replaceEventToEdit = () => {
      replace(eventEditComponent, currentEvent);
    };

    const replaceEditToEvent = () => {
      replace(currentEvent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    currentEvent.setEditButtonClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  });
};

const renderTripDays = (container, eventDays) => {
  render(siteTripEvents, new Sort(), RenderPosition.AFTERBEGIN);

  eventDays.forEach((items, index) => {
    const tripDay = new TripDay(items, index);
    render(container, tripDay, RenderPosition.BEFOREEND);
    const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
    renderTripEvents(items, tripEventsList);
  });
};

const renderTripList = (container) => {
  if (groupEventItems.length > 0) {
    renderTripDays(container, groupEventItems);
  } else {
    render(siteTripEvents, new NoTripDays(), RenderPosition.BEFOREEND);
  }
};

const tripList = new TripList();
render(siteTripEvents, tripList, RenderPosition.BEFOREEND);
renderTripList(tripList.getElement());
