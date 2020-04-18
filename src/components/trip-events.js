import {EventSuffix, MAX_ISO_STRING_LENGTH, DEFAULT_EXTRA_HOURS, DEFAULT_EXTRA_DAYS, MAX_SHOWING_OFFERS} from "../const";
import {castTimeFormat, checkSuffix} from "../utils";

const createEventMarkup = (tripEvent) => {
  const {type, time, price, offers, destination} = tripEvent;
  const {eventStartTime, eventEndTime} = time;

  const getSelectedOffers = () => {
    return offers.filter((offer) => offer.required).slice(0, MAX_SHOWING_OFFERS).map((offer) => {
      return `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
       </li>`;
    }).join(`\n`);
  };

  const getDurationTime = () => {
    const duration = new Date(eventEndTime - eventStartTime);
    const durationMinutes = duration.getMinutes();
    const durationHours = duration.getHours() - DEFAULT_EXTRA_HOURS;
    const durationDays = duration.getDate() - DEFAULT_EXTRA_DAYS;

    if (durationDays > 0) {
      if (durationHours > 0) {
        return `${durationDays}D ${durationHours}H ${durationMinutes}M`;
      }
      return `${durationDays}D 0H ${durationMinutes}M`;
    } else if (durationHours > 0) {
      return `${durationHours}H ${durationMinutes}M`;
    }
    return `${durationMinutes}M`;
  };

  const eventTimeMarkup = () => {
    const startISOString = eventStartTime.toISOString().slice(0, MAX_ISO_STRING_LENGTH);
    const endISOString = eventEndTime.toISOString().slice(0, MAX_ISO_STRING_LENGTH);

    const startTimeHours = castTimeFormat(eventStartTime.getHours());
    const startTimeMinutes = castTimeFormat(eventStartTime.getMinutes());
    const endTimeHours = castTimeFormat(eventEndTime.getHours());
    const endTimeMinutes = castTimeFormat(eventEndTime.getMinutes());

    return (
      `<p class="event__time">
        <time class="event__start-time" datetime="${startISOString}">${startTimeHours}:${startTimeMinutes}</time>
        &mdash;
        <time class="event__end-time" datetime="${endISOString}">${endTimeHours}:${endTimeMinutes}</time>
      </p>
       <p class="event__duration">${getDurationTime()}</p>`
    );
  };

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${EventSuffix[checkSuffix(type)] + destination.currentCity}</h3>

      <div class="event__schedule">
      ${eventTimeMarkup()}
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getSelectedOffers()}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

const createTripEventsTemplate = (tripEvent) => {
  return (
    `<li class="trip-events__item">
        ${createEventMarkup(tripEvent)}
      </li>`
  );
};

export {createTripEventsTemplate};
