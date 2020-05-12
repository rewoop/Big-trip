import AbstractComponent from "./abstract-component";

const createLoadingEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export default class LoadingComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingEventsTemplate();
  }
}
