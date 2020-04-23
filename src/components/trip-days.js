import AbstractComponent from "./abstract-component";

const createTripDaysTemplate = (day, index) => {
  const month = day[0].time.eventStartTime.toDateString().slice(4, 7).toUpperCase();
  const date = day[0].time.eventStartTime.toDateString().slice(8, 10);
  const dateISOString = day[0].time.eventStartTime.toISOString().slice(0, 10);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${dateISOString}">${month} ${date}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
   </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTripDaysTemplate(this._day, this._index);
  }
}
