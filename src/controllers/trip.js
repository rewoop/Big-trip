import {render, RenderPosition} from "../utils/render";
import Sort, {SortType} from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";
import {FIRST_DAY_COUNTER} from "../const";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point";

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
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
    this._creatingPoint = null;

    this._pointControllers = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  createPoint(button) {
    if (this._creatingPoint) {
      return;
    }

    this._onNewEventViewChange(button);

    const container = this._tripList.getElement();
    this._creatingPoint = new PointController(this._onDataChange, this._onViewChange);
    const newEvent = this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
    render(container, newEvent, RenderPosition.AFTERBEGIN);
  }

  _removePoints() {
    this._tripList.clearElement();
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];
  }

  _renderEventsList(eventsList) {
    return eventsList.map((tripEvent) => {
      const pointController = new PointController(this._onDataChange, this._onViewChange);
      this._pointControllers.push(pointController);
      return pointController.render(tripEvent, PointControllerMode.DEFAULT);
    });
  }

  _renderSortingByDay(currentEvents, currentContainer) {
    currentEvents.forEach((day, index) => {
      const tripDay = new TripDay(day.items, index);
      const tripEventsList = this._renderEventsList(day.items);
      tripDay.renderEventsList(tripEventsList);
      render(currentContainer, tripDay);
    });
  }

  _renderSortingByType(currentEvents, currentContainer, sortType) {
    const tripDay = new TripDay(currentEvents[0], FIRST_DAY_COUNTER, sortType);
    currentEvents.forEach((day) => {
      const tripEventsList = this._renderEventsList(day);
      tripDay.renderEventsList(tripEventsList);
    });
    render(currentContainer, tripDay);
  }

  _onSortTypeChange(sortType) {
    const points = this._pointsModel.getPointsAll();
    const sortedEvents = getSortedEvents(points, sortType);
    const container = this._tripList.getElement();
    this._pointControllers = [];
    this._tripList.clearElement();
    return sortType === SortType.EVENT ? this._renderSortingByDay(sortedEvents, container) : this._renderSortingByType(sortedEvents, container, sortType);
  }

  _updatePoints() {
    this._removePoints();
    this.renderEvents(this._tripList.getElement(), this._pointsModel.getPoints());
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._updatePoints();
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onNewEventViewChange(button) {
    this._onViewChange();
    button.setAttribute(`disabled`, `disabled`);
    this._updatePoints();
  }

  _onViewChange() {
    this._pointControllers.forEach((event) => event.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }

  renderEvents(container, points) {
    const defaultSortedEvents = getSortedEvents(points, SortType.EVENT);
    this._renderSortingByDay(defaultSortedEvents, container);
  }

  renderTripList() {
    const points = this._pointsModel.getPointsAll();
    if (points.length <= 0) {
      render(this._container, this._noTripDays);
      return;
    }
    const tripListContainer = this._tripList.getElement();
    this.renderEvents(tripListContainer, points);
    render(this._container, this._tripList);
    render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);
  }
}
