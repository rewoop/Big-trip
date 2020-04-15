import {createTripEventsTemplate} from "./trip-events";

const createTripDaysTemplate = (day) => {
  const createCurrentTripEvents = () => {
    return day.item.map((it) => {
      return it.item.map((tripEvent) => {
        return createTripEventsTemplate(tripEvent);
      }).join(`\n`);
    });
  };

  const month = day.item[0].item[0].time.eventStartTime.toDateString().slice(4, 7).toUpperCase();
  const date = day.item[0].item[0].time.eventStartTime.toDateString().slice(8, 10);
  const dateISOString = day.item[0].item[0].time.eventStartTime.toISOString().slice(0, 10);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day.day < 10 ? day.day.slice(1) : day.day}</span>
      <time class="day__date" datetime="${dateISOString}">${month} ${date}</time>
    </div>

    <ul class="trip-events__list">
     ${createCurrentTripEvents()}
    </ul>
   </li>`
  );
};

export {createTripDaysTemplate};
