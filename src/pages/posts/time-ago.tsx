import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

dayjs.extend(RelativeTime);

export default function TimeAgo(props: { timestamp: number }) {
  const { timestamp } = props;
  return <span>{dayjs(timestamp).fromNow()}</span>;
}
