import TripEvents from "../components/trip-events";
import NewEvent from "../components/new-event";
import {parseDestinationInfo} from "../utils/common";
import {replace, remove} from "../utils/render";
import {EventTypeOffers} from "../const";
import {destinations} from "../mock/event";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const EmptyPoint = {
  id: String(new Date() + Math.random()),
  type: `taxi`,
  time: {
    eventStartTime: new Date(),
    eventEndTime: new Date(),
  },
  price: 0,
  offers: EventTypeOffers[`taxi`],
  destination: parseDestinationInfo(destinations, `Paris`),
  isFavorite: false
};

export default class PointController {
  constructor(onDataChange, onViewChange) {
    this._currentEvent = null;
    this._eventEditComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._currentEvent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._currentEvent = new TripEvents(event);
    this._eventEditComponent = new NewEvent(event, this._mode);

    this._currentEvent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteBtnHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    if (mode === Mode.DEFAULT) {
      if (oldEventEditComponent && oldEventComponent) {
        replace(this._currentEvent, oldEventComponent);
        replace(this._eventEditComponent, oldEventEditComponent);
        this._replaceEditToEvent();
      }
      return this._currentEvent;
    } else if (mode === Mode.ADDING) {
      if (oldEventEditComponent && oldEventComponent) {
        remove(oldEventComponent);
        remove(oldEventEditComponent);
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
      return this._eventEditComponent;
    }
    return this._currentEvent;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._currentEvent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._currentEvent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.rerender();
    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._currentEvent, this._eventEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
