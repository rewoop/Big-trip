import TripEvents from "../components/trip-events";
import NewEvent from "../components/new-event";
import {render, RenderPosition, replace} from "../utils/render";
import Sort, {SortType} from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";

const renderTripEvents = (eventsList, container) => {
  // console.log(eventsList);
  eventsList.forEach((tripEvent) => {
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

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];

  switch (sortType) {
    case SortType.EVENT:
      const reduceEventItems = events.reduce((days, item) => {
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
      sortedEvents = events.sort((a, b) => {
        const firstElemDueTime = new Date(a.time.eventEndTime - a.time.eventStartTime);
        const secondElemDueTime = new Date(b.time.eventEndTime - b.time.eventStartTime);
        return firstElemDueTime < secondElemDueTime ? 1 : -1;
      }).map((event) => [event]);
      break;
    case SortType.PRICE:
      sortedEvents = events.sort((a, b) => a.price < b.price ? 1 : -1).map((event) => [event]);
      break;
  }
  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
  }

  render(events) {
    const defaultSortedEvents = getSortedEvents(events, SortType.EVENT);

    const getSortingByDay = (currentEvents, container) => {
      currentEvents.forEach((event, index) => {
        const tripDay = new TripDay(event.items, index);
        render(container, tripDay, RenderPosition.BEFOREEND);
        const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderTripEvents(event.items, tripEventsList);
      });
    };

    if (defaultSortedEvents.length > 0) {
      render(this._container, this._tripList, RenderPosition.BEFOREEND);
      const tripListContainer = this._tripList.getElement();

      render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);

      getSortingByDay(defaultSortedEvents, tripListContainer);

      this._sort.setSortTypeChangeHandler((sortType) => {
        const sortedEvents = getSortedEvents(events, sortType);
        this._tripList.getElement().innerHTML = ``;
        if (sortType === SortType.EVENT) {
          getSortingByDay(sortedEvents, tripListContainer);
        } else {
          sortedEvents.forEach((event, index) => {
            const tripDay = new TripDay(event, index);
            render(tripListContainer, tripDay, RenderPosition.BEFOREEND);
            const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
            renderTripEvents(event, tripEventsList);
          });
        }
      });
    } else {
      render(this._container, this._noTripDays, RenderPosition.BEFOREEND);
    }
  }
}
