import {
  getRandomItem,
  getRandomIntegerNumber,
  getRandomBoolean,
  castTimeFormat,
  getOffers,
  checkSuffix,
} from "../utils";
import {CITIES, TRANSFER_EVENTS, ACTIVITY_EVENTS, MIN_EVENT_PRICE, MAX_EVENT_PRICE, EVENT_TYPES, EventSuffix} from "../const";

const createNewEventTemplate = (newEvent) => {
  const {time, newEventForm} = newEvent;
  const {description, photos, currentEventType} = newEventForm;
  const {eventStartTime, eventEndTime} = time;
  const {icon, label} = currentEventType;

  const renderPhotosMarkup = () => {
    return photos.map((photo) => {
      return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
    }).join(`\n`);
  };

  const getTypesMarkup = (type) => {
    return `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`;
  };

  const renderEventTypesGroupMarkup = (isTransfer) => {
    if (isTransfer) {
      return EVENT_TYPES.slice(0, TRANSFER_EVENTS).map((type) => {
        return getTypesMarkup(type);
      }).join(`\n`);
    } else {
      return EVENT_TYPES.slice(TRANSFER_EVENTS, ACTIVITY_EVENTS).map((type) => {
        return getTypesMarkup(type);
      }).join(`\n`);
    }
  };

  const renderDestinationsMarkup = () => {
    return CITIES.slice().map((city) => {
      return (
        `<option value="${city}"></option>`
      );
    }).join(`\n`);
  };

  const generateOffers = () => {
    return getOffers(label).map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${getRandomBoolean() ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${renderEventTypesGroupMarkup(true)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${renderEventTypesGroupMarkup(false)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${label} ${EventSuffix[checkSuffix(label)]}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getRandomItem(CITIES)}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${renderDestinationsMarkup()}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${castTimeFormat(eventStartTime.getDate())}/${castTimeFormat(eventStartTime.getMonth())}/${String(eventStartTime.getFullYear()).slice(2)} ${castTimeFormat(eventStartTime.getHours())}:${castTimeFormat(eventStartTime.getMinutes())}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${castTimeFormat(eventEndTime.getDate())}/${castTimeFormat(eventEndTime.getMonth())}/${String(eventEndTime.getFullYear()).slice(2)} ${castTimeFormat(eventEndTime.getHours())}:${castTimeFormat(eventEndTime.getMinutes())}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getRandomIntegerNumber(MIN_EVENT_PRICE, MAX_EVENT_PRICE)}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${generateOffers()}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description.join(`\n`)}</p>

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

export {createNewEventTemplate};
