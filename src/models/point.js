import {formatOfferTitleToId, formatString, formatOffers} from "../utils/common";

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
        id: formatOfferTitleToId(offer.title)
      });
    });
    this.destination = {
      description: data[`destination`][`description`],
      photos: data[`destination`][`pictures`],
      currentCity: data[`destination`][`name`]
    };
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      "id": this.id.toString(),
      "type": this.type.toLowerCase(),
      "date_from": this.time.eventStartTime.toISOString(),
      "date_to": this.time.eventEndTime.toISOString(),
      "base_price": parseInt(this.price, 10),
      "offers": this.offers ? formatOffers(this.offers) : null,
      "destination": this.destination ? {
        "name": this.destination.currentCity,
        "pictures": this.destination.photos,
        "description": this.destination.description
      } : null,
      "is_favorite": this.isFavorite
    };
  }

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
