import React from "react";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import { formatTime } from "../utils/formatTime";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNowStrict(date);

    timeAgo = formatTime(timePeriod);
  }
  return (
    <span title={timestamp} className="text-sm">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
