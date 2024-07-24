import { Edge, Node, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
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
  SubwayItem,
  SubwayItemDimension,
  SubwayItemEvent,
  SubwayItemKey,
} from './model';
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

  useEffect(() => {
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

const mockNodes: Node[] = [
  {
    id: 'x-0',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      item: {
        id: SubwayItemKey.ExportFaFile,
        count: 1,
        total: 1,
        status: 'normal',
        subject: '导出估值文件',
      },
    },
    type: 'SubwayItemNode',
  },
  {
    id: 'x-1',
    position: {
      x: 160,
      y: 0,
    },
    data: {
      item: {
        id: SubwayItemKey.ExceptionWithdraw,
        count: 1,
        total: 1,
        status: 'normal',
        subject: '异常撤单',
      },
    },
    type: 'SubwayItemNode',
  },
  {
    id: 'x-2',
    position: {
      x: 320,
      y: 30,
    },
    data: {
      item: {
        id: SubwayItemKey.SaTotalControl,
        count: 1,
        total: 1,
        status: 'normal',
        subject: '渠道总控',
      },
    },
    type: 'SubwayItemNode',
  },
];

const edgeStyle: CSSProperties = {
  strokeWidth: 8,
  stroke: 'var(--border-color-primary)',
};

const mockEdges: Edge[] = [
  {
    id: 'edge-x0-x1',
    source: 'x-0',
    target: 'x-1',
    interactionWidth: 30,
    style: edgeStyle,
  },
  {
    id: 'edge-x1-x2',
    source: 'x-1',
    target: 'x-2',
    style: edgeStyle,
  },
];
