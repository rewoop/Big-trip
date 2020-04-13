import {eventTypesMap, MAX_ISO_STRING_LENGTH} from "../const";
import {castTimeFormat} from "../utils";

const createEventMarkup = (tripEvent) => {
  const {type, city, time, price, offers} = tripEvent;
  const {eventStartTime, duration, eventEndTime} = time;

  const getSelectedOffers = () => {
    return offers.map((offer) => {
      return (`<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
       </li>`);
    }).join(`\n`);
  };

  const getDurationTime = () => {
    if (duration.days > 0) {
      if (duration.hours > 0) {
        return `<p class="event__duration">${duration.days}D ${duration.hours}H ${duration.minutes}M</p>`;
      }
      return `<p class="event__duration">${duration.days}D 0H ${duration.minutes}M</p>`;
    } else if (duration.hours > 0) {
      return `<p class="event__duration">${duration.hours}H ${duration.minutes}M</p>`;
    }
    return `<p class="event__duration">${duration.minutes}M</p>`;
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
       ${getDurationTime()}`
    );
  };

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventTypesMap[type] + city}</h3>

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
