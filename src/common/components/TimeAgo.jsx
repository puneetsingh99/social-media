import React from "react";
import {
  parseISO,
  formatDistanceToNowStrict,
  formatDistanceToNow,
} from "date-fns";
import { formatTime } from "../utils/formatTime";

export const TimeAgo = ({ timestamp, full }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);

    if (!full) {
      const timePeriod = formatDistanceToNowStrict(date);
      timeAgo = formatTime(timePeriod);
    }

    if (full) {
      timeAgo = `${formatDistanceToNow(date)} ago`;
    }
  }
  return (
    <span title={timestamp} className="text-sm">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
