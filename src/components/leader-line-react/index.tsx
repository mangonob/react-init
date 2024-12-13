import { useEffect } from 'react';

interface LeaderLineProps {
  source: HTMLElement | null | undefined;
  target: HTMLElement | null | undefined;
  isHidden?: boolean;
  options?: LeaderLineOptions;
}

export default function LeaderLineReact(props: LeaderLineProps) {
  const { source, isHidden = false, target, options } = props;

  useEffect(() => {
    if (source && target) {
      const leader = new LeaderLine(source, target, {
        dash: { len: 3, gap: 4 },
        size: 2,
        color: 'gray',
        hide: isHidden,
        ...options,
      });
      return () => leader.remove();
    }
  }, [source, target, options, isHidden]);

  return <></>;
}
