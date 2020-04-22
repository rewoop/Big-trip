import TripEvents from "../components/trip-events";
import NewEvent from "../components/new-event";
import {render, RenderPosition, replace} from "../utils/render";
import Sort from "../components/sort";
import TripDay from "../components/trip-days";
import NoTripDays from "../components/no-trip-days";

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

// const renderTripDays = (container, eventDays, siteTripEvents) => {
//   render(siteTripEvents, new Sort(), RenderPosition.AFTERBEGIN);
//
//   eventDays.forEach((items, index) => {
//     const tripDay = new TripDay(items, index);
//     render(container, tripDay, RenderPosition.BEFOREEND);
//     const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
//     renderTripEvents(items, tripEventsList);
//   });
// };

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._noTripDays = new NoTripDays();
  }

  render(eventItems, siteTripEvents) {
    const container = this._container.getElement();

    if (eventItems.length > 0) {
      // renderTripDays(container, eventItems, siteTripEvents);

      render(siteTripEvents, this._sort, RenderPosition.AFTERBEGIN);
      eventItems.forEach((items, index) => {
        const tripDay = new TripDay(items, index);
        render(container, tripDay, RenderPosition.BEFOREEND);
        const tripEventsList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderTripEvents(items, tripEventsList);
      });
    } else {
      render(siteTripEvents, this._noTripDays, RenderPosition.BEFOREEND);
    }
  }
}
