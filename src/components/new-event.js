import {
  castTimeFormat,
  checkSuffix
} from "../utils/common";
import {CITIES, TRANSFER_EVENTS, ACTIVITY_EVENTS, EVENT_TYPES, EventSuffix, EventTypeOffers} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";
import {destinations} from "../mock/event";

const createNewEventTemplate = (newEvent, options = {}) => {
  const {time, price, isFavorite} = newEvent;
  const {type, offers, destination} = options;
  const {description, photos, currentCity} = destination;
  const {eventStartTime, eventEndTime} = time;

  const renderPhotosMarkup = () => {
    return photos.map((photo) => {
      return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
    }).join(`\n`);
  };

  const getTypesMarkup = (eventType) => {
    return `<div class="event__type-item">
      <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
      <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
    </div>`;
  };

  const renderEventTypesGroupMarkup = (start, end) => {
    return EVENT_TYPES.slice(start, end).map((eventType) => {
      return getTypesMarkup(eventType);
    }).join(`\n`);
  };

  const renderDestinationsMarkup = () => {
    return CITIES.map((city) => {
      return (
        `<option value="${city}"></option>`
      );
    }).join(`\n`);
  };

  const renderTimeFormat = (currentEventTime) => {
    return `${castTimeFormat(currentEventTime.getDate())}/${castTimeFormat(currentEventTime.getMonth())}/${String(currentEventTime.getFullYear()).slice(2)} ${castTimeFormat(currentEventTime.getHours())}:${castTimeFormat(currentEventTime.getMinutes())}`;
  };

  const generateOffers = () => {
    return offers.map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${offer.required ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  };

  const checkOffers = () => {
    return generateOffers() !== `` ? (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${generateOffers()}
        </div>
      </section>`
    ) : ``;
  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${renderEventTypesGroupMarkup(0, TRANSFER_EVENTS)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${renderEventTypesGroupMarkup(TRANSFER_EVENTS, ACTIVITY_EVENTS)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type.charAt(0).toUpperCase()}${type.slice(1)} ${EventSuffix[checkSuffix(type)]}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${renderDestinationsMarkup()}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${renderTimeFormat(eventStartTime)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${renderTimeFormat(eventEndTime)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              ${checkOffers()}
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${renderPhotosMarkup()}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

export default class NewEvent extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._eventType = event.type.slice();
    this._eventOffers = event.offers.slice();
    this._eventDestination = Object.assign({}, event.destination);
    this._submitHandler = null;
    this._favoriteBtnHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewEventTemplate(this._event, {
      type: this._eventType,
      offers: this._eventOffers,
      destination: this._eventDestination
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteBtnHandler(this._favoriteBtnHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteBtnHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteBtnHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeList = element.querySelector(`.event__type-list`);
    const eventDestination = element.querySelector(`#event-destination-1`);

    eventTypeList.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._eventType = evt.target.value;
      this._eventOffers = EventTypeOffers[evt.target.value].map((offer) => {
        return Object.assign({}, offer);
      });
      this.rerender();
    });

    eventDestination.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const index = destinations.findIndex((destination) => destination.currentCity === evt.target.value);
      if (index === -1) {
        return;
      }
      this._eventDestination = destinations[index];
      this.rerender();
    });
  }
}
