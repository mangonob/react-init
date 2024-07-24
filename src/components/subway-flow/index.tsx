import { Edge, Node, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { CSSProperties, HTMLAttributes, useMemo } from 'react';
import { createObserver } from 'src/foundation/observer';
import { SubwayFlowProvider } from './context';
import { BluePrint, useSubwayAutoLayout } from './hooks';
import styles from './index.module.scss';
import { SubwayItem, SubwayItemDimensionEvent } from './model';
import SubwayItemView from './subway-item-view';

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
      <div className={styles.subwayFlow} {...extra}>
        <ReactFlow
          nodes={mockNodes}
          draggable={false}
          minZoom={1}
          maxZoom={1}
          edges={mockEdges}
          nodeTypes={{ SubwayItemView }}
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
    data: {},
    type: 'SubwayItemView',
  },
  {
    id: 'x-1',
    position: {
      x: 160,
      y: 0,
    },
    data: {},
    type: 'SubwayItemView',
  },
  {
    id: 'x-2',
    position: {
      x: 320,
      y: 0,
    },
    data: {},
    type: 'SubwayItemView',
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
