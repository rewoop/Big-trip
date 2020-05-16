import AbstractComponent from "./abstract-component";

const createLoadingEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export default class Loading extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingEventsTemplate();
  }
}
