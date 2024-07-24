import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, {
  HTMLAttributes,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createObserver } from 'src/foundation/observer';
import { SubwayFlowProvider } from './context';
import {
  BluePrint,
  SubwayViewCustomized,
  useFlowEdges,
  useFlowNodes,
  useSubwayAutoLayout,
} from './hooks';
import styles from './index.module.scss';
import { SubwayItem, SubwayItemDimension, SubwayItemEvent } from './model';
import SubwayItemNode from './subway-item-node';

interface SubwayFlowProps
  extends HTMLAttributes<HTMLDivElement>,
    SubwayViewCustomized {
  items?: SubwayItem[];
  onItemClick?: (item: SubwayItem) => void;
  onViewportChanged?: (width: number, height: number) => void;
  blueprint?: BluePrint;
}

export default function SubwayFlow(props: SubwayFlowProps) {
  const {
    items = [],
    blueprint = { nodes: [] },
    onItemClick,
    estimateItemHeight,
    columnSpacing,
    rowSpacing,
    columnAlign,
    ...extra
  } = props;

  const observer = useMemo(() => createObserver<SubwayItemEvent>(), []);
  const { visibleItems, compactNodes, map } = useSubwayAutoLayout(
    items,
    blueprint
  );
  const itemSizeCollector = useRef(new Map<string, SubwayItemDimension>());
  const [sizes, setSizes] = useState(new Map<string, SubwayItemDimension>());
  const { nodes } = useFlowNodes(visibleItems, compactNodes, map, sizes, {
    estimateItemHeight,
    rowSpacing,
    columnAlign,
    columnSpacing,
  });
  const edges = useFlowEdges(compactNodes);

  useLayoutEffect(() => {
    const unsubscribe = observer.subscribe((e) => {
      switch (e.type) {
        case 'sizeChanged': {
          const { id, width, height } = e;
          itemSizeCollector.current.set(id, { width, height });
          if (itemSizeCollector.current.size === items.length) {
            setSizes(itemSizeCollector.current);
          }
          break;
        }
      }
    });

    return () => {
      unsubscribe();
      itemSizeCollector.current.clear();
      setSizes(new Map());
    };
  }, [items, observer]);

  return (
    <SubwayFlowProvider value={observer}>
      <div className={styles.subwayFlow} {...extra}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          draggable={false}
          minZoom={1}
          maxZoom={1}
          nodeTypes={{ SubwayItemNode }}
          fitView={false}
        ></ReactFlow>
      </div>
    </SubwayFlowProvider>
  );
}
