import { formatDistanceToNowStrict } from "date-fns";

const shortFormat = {
  second: "s",
  seconds: "s",
  minute: "m",
  minutes: "m",
  hour: "h",
  hours: "h",
  day: "d",
  days: "d",
  month: "mo",
  months: "mo",
  year: "y",
  years: "y",
};

export const formatTime = (timePeriod) => {
  const timePeriodSplit = timePeriod.split(" ");
  const formattedTimePeriod =
    timePeriodSplit[0] + shortFormat[timePeriodSplit[1]];
  return formattedTimePeriod;
};
