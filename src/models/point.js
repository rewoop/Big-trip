import {formatOfferTitleToId, formatString} from "../utils/common";

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = formatString(data[`type`]);
    this.time = {
      eventStartTime: new Date(data[`date_from`]),
      eventEndTime: new Date(data[`date_to`]),
    };
    this.price = data[`base_price`];
    this.offers = data[`offers`].map((offer) => {
      return Object.assign({}, offer, {
        id: formatOfferTitleToId(offer.title),
        required: true
      });
    });
    this.destination = {
      description: data[`destination`][`description`],
      photos: data[`destination`][`pictures`],
      currentCity: data[`destination`][`name`]
    };
    this.isFavorite = data[`is_favorite`];
  }

  // toRAW() {
  //   return {
  //     "id": this.id,
  //     "description": this.description,
  //     "due_date": this.dueDate ? this.dueDate.toISOString() : null,
  //     "repeating_days": this.repeatingDays,
  //     "color": this.color,
  //     "is_favorite": this.isFavorite,
  //     "is_archived": this.isArchive,
  //   };
  // }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
