import { parseISO, formatDistanceToNow } from "date-fns";

const Timeago = ({ timestamp }) => {
  let timeAgo;
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default Timeago;
