import React from "react";
import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNowStrict(date);
    let formattedTime = timePeriod.split(" ");
    console.log(formattedTime);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp} className="text-sm">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
