import {FilterType} from "../const";
import {isFutureDate, isPastDate} from "./common";

const getFutureFilteredPoints = (points, date) => {
  return points.filter((point) => isFutureDate(date, point.time.eventStartTime));
};

const getPastFilteredPoints = (points, date) => {
  return points.filter((point) => isPastDate(date, point.time.eventStartTime));
};

const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFutureFilteredPoints(points, nowDate);
    case FilterType.PAST:
      return getPastFilteredPoints(points, nowDate);
  }

  return points;
};

export {getPointsByFilter};
