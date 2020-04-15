import {createTripEventsTemplate} from "./trip-events";

const createTripDaysTemplate = (days, index) => {
  const createCurrentTripEvents = () => {
    return days.item.map((tripEvent) => {
      return createTripEventsTemplate(tripEvent);
    }).join(`\n`);
  };

  const month = days.item[0].time.eventStartTime.toDateString().slice(4, 7).toUpperCase();
  const date = days.item[0].time.eventStartTime.toDateString().slice(8, 10);
  const dateISOString = days.item[0].time.eventStartTime.toISOString().slice(0, 10);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${dateISOString}">${month} ${date}</time>
    </div>

    <ul class="trip-events__list">
     ${createCurrentTripEvents()}
    </ul>
   </li>`
  );
};

export {createTripDaysTemplate};
