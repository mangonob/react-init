import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { isEqual } from 'lodash-es';
import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
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
import {
  Size,
  SubwayItem,
  SubwayItemDimension,
  SubwayItemEvent,
} from './model';
import SubwayFlowEdge from './subway-flow-edge';
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
    style,
    estimateItemSize,
    ...extra
  } = props;

  const observer = useMemo(() => createObserver<SubwayItemEvent>(), []);
  const { visibleItems, compactNodes, map } = useSubwayAutoLayout(
    items,
    blueprint
  );
  const itemSizeCollector = useRef(new Map<string, SubwayItemDimension>());
  const defaultSizes = (() => {
    if (estimateItemSize && items.length > 0) {
      const sizesEntries = items.map((item): [string, Size] => [
        item.id,
        estimateItemSize(item),
      ]);
      return new Map(sizesEntries);
    }
  })();
  const [sizes, setSizes] = useState(
    defaultSizes ?? new Map<string, SubwayItemDimension>()
  );
  const customized = {
    estimateItemHeight,
    rowSpacing,
    columnAlign,
    columnSpacing,
  };
  const { nodes, viewport } = useFlowNodes(
    visibleItems,
    compactNodes,
    map,
    sizes,
    customized,
    onItemClick
  );

  const edges = useFlowEdges(compactNodes, customized);

  useEffect(() => {
    if (estimateItemSize && sizes.size === 0 && visibleItems.length > 0) {
      const sizesEntries = visibleItems.map((item): [string, Size] => [
        item.id,
        estimateItemSize(item),
      ]);
      setSizes(new Map(sizesEntries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems]);

  useLayoutEffect(() => {
    const unsubscribe = observer.subscribe((e) => {
      switch (e.type) {
        case 'sizeChanged': {
          const { id, width, height } = e;

          if (!isEqual(itemSizeCollector.current.get(id), { width, height })) {
            itemSizeCollector.current.set(id, { width, height });
            if (itemSizeCollector.current.size === visibleItems.length) {
              setSizes(new Map(itemSizeCollector.current.entries()));
            }
          }

          break;
        }
      }
    });

    return () => {
      unsubscribe();
      itemSizeCollector.current.clear();
    };
  }, [visibleItems, observer]);

  const _style = ((): CSSProperties => {
    const dimensions = viewport
      ? { width: viewport.width, height: viewport.height }
      : { width: 9999, height: 9999 };

    return {
      ...dimensions,
      ...style,
    };
  })();

  const _containerStyle = ((): CSSProperties => {
    const dimensions = viewport
      ? { width: viewport.width, height: viewport.height }
      : { width: 1, height: 1 };

    return {
      ...dimensions,
      ...style,
    };
  })();

  return (
    <SubwayFlowProvider value={observer}>
      <div className={styles.subwayFlow} style={_containerStyle} {...extra}>
        <div style={_style}>
          <ReactFlow
            className={styles.flow}
            nodes={nodes}
            edges={edges}
            draggable={false}
            panOnDrag={false}
            panOnScroll={false}
            minZoom={1}
            maxZoom={1}
            nodeTypes={{ SubwayItemNode }}
            edgeTypes={{ SubwayFlowEdge }}
            fitView={false}
          ></ReactFlow>
        </div>
      </div>
    </SubwayFlowProvider>
  );
}
