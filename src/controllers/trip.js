import {render, RenderPosition} from "../utils/render";
import Sort, {SortType} from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";
import {FIRST_DAY_COUNTER} from "../const";
import PointController from "./point";

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
  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();

    this._pointControllers = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderEventsList(eventsList, pointController) {
    return eventsList.map((tripEvent) => {
      return pointController.render(tripEvent);
    });
  }

  _renderSortingByDay(currentEvents, currentContainer) {
    currentEvents.map((day, index) => {
      const tripDay = new TripDay(day.items, index);
      const pointController = new PointController(this._onDataChange, this._onViewChange);
      const tripEventsList = this._renderEventsList(day.items, pointController);
      tripDay.renderEventsList(tripEventsList);
      render(currentContainer, tripDay);
      return this._pointControllers.push(pointController);
    });
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    const container = this._tripList.getElement();

    this._tripList.clearElement();
    if (sortType === SortType.EVENT) {
      this._renderSortingByDay(sortedEvents, container);
    } else {
      const tripDay = new TripDay(sortedEvents[0], FIRST_DAY_COUNTER, sortType);
      sortedEvents.map((day) => {
        const pointController = new PointController(this._onDataChange, this._onViewChange);
        const tripEventsList = this._renderEventsList(day, pointController);
        tripDay.renderEventsList(tripEventsList);
        return this._pointControllers.push(pointController);
      });
      render(container, tripDay);
    }
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((event) => event.setDefaultView());
  }

  renderEvents(container) {
    const defaultSortedEvents = getSortedEvents(this._events, SortType.EVENT);
    this._renderSortingByDay(defaultSortedEvents, container);
  }

  renderTripList(events) {
    this._events = events;
    if (this._events.length <= 0) {
      render(this._container, this._noTripDays);
      return;
    }
    const tripListContainer = this._tripList.getElement();
    this.renderEvents(tripListContainer);
    render(this._container, this._tripList);
    render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);
  }
}
