import TripEvents from "../components/trip-events";
import NewEvent from "../components/new-event";
import {render, RenderPosition, replace} from "../utils/render";
import Sort, {SortType} from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";
import {FIRST_DAY_COUNTER} from "../const";

const renderTripEvents = (eventsList) => {
  return eventsList.map((tripEvent) => {
    const currentEvent = new TripEvents(tripEvent);
    const eventEditComponent = new NewEvent(tripEvent);

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
    return currentEvent;
  });
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];

  switch (sortType) {
    case SortType.EVENT:
      const reduceEventItems = events.slice().sort((a, b) => a.time.eventStartTime > b.time.eventStartTime ? 1 : -1)
        .reduce((days, item) => {
          const time = item.time.eventStartTime.toJSON().slice(5, 10);
          days[time] = days[time] || [];
          days[time].push(item);
          return days;
        }, {});

      sortedEvents = Object.keys(reduceEventItems).map((day) => {
        return {
          day,
          items: reduceEventItems[day]
        };
      }).sort((a, b) => a.day > b.day ? 1 : -1);
      break;
    case SortType.TIME:
      sortedEvents = events.slice().sort((a, b) => {
        const firstElemDueTime = new Date(a.time.eventEndTime - a.time.eventStartTime);
        const secondElemDueTime = new Date(b.time.eventEndTime - b.time.eventStartTime);
        return firstElemDueTime < secondElemDueTime ? 1 : -1;
      }).map((event) => [event]);
      break;
    case SortType.PRICE:
      sortedEvents = events.slice().sort((a, b) => a.price < b.price ? 1 : -1).map((event) => [event]);
      break;
  }
  console.log(sortedEvents);
  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
  }

  renderEvents(events, container) {
    const defaultSortedEvents = getSortedEvents(events, SortType.EVENT);

    const renderSortingByDay = (currentEvents, currentContainer) => {
      currentEvents.forEach((day, index) => {
        const tripDay = new TripDay(day.items, index);
        const tripEventsList = renderTripEvents(day.items);
        tripDay.renderEventsList(tripEventsList);
        render(currentContainer, tripDay);
      });
    };

    renderSortingByDay(defaultSortedEvents, container);

    this._sort.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);
      this._tripList.clearElement();
      if (sortType === SortType.EVENT) {
        renderSortingByDay(sortedEvents, container);
      } else {
        const tripDay = new TripDay(sortedEvents[0], FIRST_DAY_COUNTER, sortType);
        sortedEvents.forEach((day) => {
          const tripEventsList = renderTripEvents(day);
          tripDay.renderEventsList(tripEventsList);
        });
        render(container, tripDay);
      }
    });
  }

  renderTripList(events) {
    if (events.length <= 0) {
      render(this._container, this._noTripDays);
      return;
    }
    const tripListContainer = this._tripList.getElement();
    this.renderEvents(events, tripListContainer);
    render(this._container, this._tripList);
    render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);
  }
}
