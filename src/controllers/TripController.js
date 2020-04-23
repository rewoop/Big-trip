import TripEvents from "../components/trip-events";
import NewEvent from "../components/new-event";
import {render, RenderPosition, replace} from "../utils/render";
import Sort from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";
import TripList from "../components/trip-list";

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

export default class TripController {
  constructor(container) {
    this._container = container;
    this._tripList = new TripList();
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
  }

  render(events) {
    const reduceEventItems = events.reduce((days, item) => {
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

    if (groupEventItems.length > 0) {
      render(this._container, this._tripList, RenderPosition.BEFOREEND);
      const tripListContainer = this._tripList.getElement();

      render(tripListContainer, this._sort, RenderPosition.BEFOREBEGIN);

      groupEventItems.forEach((items, index) => {
        const tripDay = new TripDay(items, index);
        render(tripListContainer, tripDay, RenderPosition.BEFOREEND);
        const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderTripEvents(items, tripEventsList);
      });
    } else {
      render(this._container, this._noTripDays, RenderPosition.BEFOREEND);
    }
  }
}
