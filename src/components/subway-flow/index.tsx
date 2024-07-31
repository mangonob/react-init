import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { CSSProperties, HTMLAttributes, useRef } from 'react';
import {
  Blueprint,
  SubwayViewCustomized,
  useFlowEdges,
  useFlowNodes,
  useNodeSizes,
  useSubwayAutoLayout,
} from './hooks';
import styles from './index.module.scss';
import { SubwayItem } from './model';
import SubwayFlowEdge from './subway-flow-edge';
import SubwayItemNode from './subway-item-node';

interface SubwayFlowProps
  extends HTMLAttributes<HTMLDivElement>,
    SubwayViewCustomized {
  items?: SubwayItem[];
  onItemClick?: (item: SubwayItem) => void;
  onViewportChanged?: (width: number, height: number) => void;
  blueprint?: Blueprint;
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
    ...extra
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { visibleItems, compactNodes, map } = useSubwayAutoLayout(
    items,
    blueprint
  );
  const sizes = useNodeSizes(ref);
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
    <div
      ref={ref}
      className={styles.subwayFlow}
      style={_containerStyle}
      {...extra}
    >
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
  );
}
