import React, { HTMLAttributes, useMemo } from 'react';
import { createObserver } from 'src/foundation/observer';
import { SubwayFlowProvider } from './context';
import { BluePrint, useSubwayAutoLayout } from './hooks';
import { SubwayItem, SubwayItemDimensionEvent } from './model';

interface SubwayFlowProps extends HTMLAttributes<HTMLDivElement> {
  items?: SubwayItem[];
  onItemClick?: (item: SubwayItem) => void;
  blueprint?: BluePrint;
  rowUnit?: number;
}

export default function SubwayFlow(props: SubwayFlowProps) {
  const {
    items = [],
    blueprint = { nodes: [] },
    onItemClick,
    rowUnit,
    ...extra
  } = props;

  useSubwayAutoLayout(items, blueprint);

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
