import React, { HTMLAttributes, useMemo } from 'react';
import { createObserver } from 'src/foundation/observer';
import { SubwayFlowProvider } from './context';
import { SubwayItem, SubwayItemDimensionEvent } from './model';

interface SubwayFlowProps extends HTMLAttributes<HTMLDivElement> {
  items?: SubwayItem[];
  onItemClick?: (item: SubwayItem) => void;
  rowUnit?: number;
}

export default function SubwayFlow(props: SubwayFlowProps) {
  const { items, onItemClick, rowUnit, ...extra } = props;

  const observer = useMemo(
    () => createObserver<SubwayItemDimensionEvent>(),
    []
  );

  return (
    <SubwayFlowProvider value={observer}>
      <div {...extra}></div>
    </SubwayFlowProvider>
  );
}

const testItem: SubwayItem[] = [
  {
    id: 'x-',
    count: 1,
    total: 1,
    status: 'normal',
    subject: '资金结算',
  },
];
