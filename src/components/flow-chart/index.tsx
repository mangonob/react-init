/**
 * @description Flow chart
 * @author 高炼
 */

import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { useMeasure } from 'react-use';
import ReactFlow, {
  NodeProps,
  NodeTypes,
  ReactFlowProps,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import { useDescendantEdges, useDescendantNodes, useNodesBound } from './hooks';
import { cast, OmitOf, unless } from './utils';

import 'reactflow/dist/style.css';
import styles from './index.module.scss';

export type FlowChartProps = PropsWithChildren<
  OmitOf<
    ReactFlowProps,
    'nodes' | 'edges' | 'defaultEdges' | 'defaultNodes' | 'nodeTypes'
  >
> & {
  /** Auto calculate size of flow chart by dismensions of nodes (default: true) */
  isAutoSize?: boolean;
  /** Auto size options (default: { padding: 10 }) */
  autoSizeOptions?: { padding?: number };
};

function _FlowChart(props: FlowChartProps) {
  const {
    isAutoSize = true,
    autoSizeOptions = {},
    children,
    style,
    className,
    ...extraProps
  } = props;

  const { padding = 10 } = autoSizeOptions;

  const instance = useReactFlow();
  const nodes = useDescendantNodes(children);
  const edges = useDescendantEdges(children);
  const bounds = useNodesBound();
  const [ref, { width, height }] = useMeasure();

  useEffect(() => {
    if (isAutoSize && width && height) {
      setTimeout(() => {
        instance.fitView({ padding });
      }, 0);
    }
  }, [isAutoSize, width, height, padding, instance]);

  const nodeTypes: NodeTypes = useMemo(() => {
    return {
      flowChartNodeInner: FlowChartNodeInner,
    };
  }, []);

  const cls = classNames(styles.flowChart, className);

  const renderReactFlow = () => {
    return (
      <ReactFlow
        className={unless(isAutoSize, cls)}
        fitView
        nodes={nodes}
        edges={edges}
        maxZoom={1}
        minZoom={1}
        draggable={false}
        panOnDrag={false}
        contentEditable={false}
        preventScrolling={false}
        nodeTypes={nodeTypes}
        style={unless(isAutoSize, style)}
        {...extraProps}
      >
        {children}
      </ReactFlow>
    );
  };

  return isAutoSize ? (
    <div
      ref={cast(ref)}
      style={{
        ...style,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2,
      }}
      className={cls}
    >
      {renderReactFlow()}
    </div>
  ) : (
    renderReactFlow()
  );
}

export default function FlowChart(props: FlowChartProps) {
  return (
    <ReactFlowProvider>
      <_FlowChart {...props} />
    </ReactFlowProvider>
  );
}

function FlowChartNodeInner(props: NodeProps<PropsWithChildren<unknown>>) {
  return <>{props.data.children}</>;
}
