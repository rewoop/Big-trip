import {render, RenderPosition} from "../utils/render";
import Sort, {SortType} from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";
import {FIRST_DAY_COUNTER, HIDDEN_CLASS} from "../const";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point";
import {removeComponent} from "../utils/common";

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
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
    this._creatingPoint = null;
    this._newEventButton = null;

    this._pointControllers = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
    this._updatePoints();
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
    this._updatePoints();
  }

  createPoint(button) {
    this._newEventButton = button;

    this._onNewEventViewChange(this._newEventButton);

    const container = this._tripList.getElement();
    this._creatingPoint = new PointController(this._onDataChange, this._onViewChange, this._pointsModel);
    const newEvent = this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING, button);
    render(container, newEvent, RenderPosition.AFTERBEGIN);
  }

  _removePoints() {
    this._tripList.clearElement();
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];
  }

  _renderEventsList(eventsList) {
    return eventsList.map((tripEvent) => {
      const pointController = new PointController(this._onDataChange, this._onViewChange, this._pointsModel);
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

  _onSortTypeChange(sortType, button = null) {
    if (button) {
      this._sort.setDefaultView();
    }
    const points = this._pointsModel.getPointsAll();
    const sortedEvents = getSortedEvents(points, sortType);
    const container = this._tripList.getElement();
    this._pointControllers = [];
    this._tripList.clearElement();
    return sortType === SortType.EVENT ? this._renderSortingByDay(sortedEvents, container) : this._renderSortingByType(sortedEvents, container, sortType);
  }

  _updatePoints() {
    this._removePoints();
    if (this._pointsModel.getPointsAll().length <= 0) {
      render(this._container, this._noTripDays);
    } else {
      removeComponent(this._noTripDays);
      this.renderEvents(this._tripList.getElement(), this._pointsModel.getPoints());
    }
  }

  _onDataChange(pointController, oldData, newData, isFavBtnHandler = false, newEventBtn = null) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
        if (newEventBtn) {
          newEventBtn.removeAttribute(`disabled`);
        }
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.render(pointModel, PointControllerMode.DEFAULT);
            this._updatePoints();
            if (newEventBtn) {
              newEventBtn.removeAttribute(`disabled`);
              this._sort.removeDisabled();
            }
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

          if (isSuccess && !isFavBtnHandler) {
            pointController.render(pointModel, PointControllerMode.DEFAULT);
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onNewEventViewChange(button) {
    button.setAttribute(`disabled`, `disabled`);
    this._onViewChange();
    this._onSortTypeChange(SortType.EVENT, button);
  }

  _onViewChange() {
    this._pointControllers.forEach((event) => event.setDefaultView());
  }

  _onFilterChange() {
    if (this._newEventButton) {
      this._newEventButton.removeAttribute(`disabled`);
      this._sort.removeDisabled();
    }
    this._updatePoints();
  }

  renderEvents(container, points) {
    const defaultSortedEvents = getSortedEvents(points, SortType.EVENT);
    this._renderSortingByDay(defaultSortedEvents, container);
  }

  renderTripList() {
    const points = this._pointsModel.getPointsAll();
    if (points.length < 1) {
      render(this._container, this._noTripDays);
      return;
    }
    const tripListContainer = this._tripList.getElement();
    this.renderEvents(tripListContainer, points);
    render(this._container, this._tripList);
    render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);
  }
}
