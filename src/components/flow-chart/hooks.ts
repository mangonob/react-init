/**
 * @description Flow chart hooks
 * @author 高炼
 */

import React, {
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react';
import {
  Edge,
  getRectOfNodes,
  MarkerType,
  Node,
  Rect,
  useStore,
} from 'reactflow';
import { FlowChartEdge, FlowChartEdgeProps } from './edge';
import { FlowChartNode, FlowChartNodeProps } from './node';

export function useDescendantNodes<C>(children: C | ReadonlyArray<C>) {
  const nodeElements = useDescendantsOfType<FlowChartNodeProps>(
    children,
    FlowChartNode
  );

  const nodes: Node[] = useMemo(() => {
    return nodeElements.map(({ props }): Node => {
      const { children, id, xPos = 0, yPos = 0 } = props;
      return {
        id,
        data: { children },
        position: { x: xPos, y: yPos },
        type: 'flowChartNodeInner',
        focusable: false,
      };
    });
  }, [nodeElements]);

  return nodes;
}

export function useDescendantEdges<C>(children: C | ReadonlyArray<C>) {
  const edgeElements = useDescendantsOfType<FlowChartEdgeProps>(
    children,
    FlowChartEdge
  );

  const edges: Edge[] = useMemo(() => {
    return edgeElements.map(({ props }): Edge => {
      const {
        id,
        source,
        target,
        style = { strokeWidth: 2 },
        focusable = false,
        markerEnd = { type: MarkerType.ArrowClosed },
        ...extraProps
      } = props;

      return {
        id: id || source + '-' + target,
        source,
        target,
        style,
        focusable,
        markerEnd,
        ...extraProps,
      };
    });
  }, [edgeElements]);

  return edges;
}

export function useDescendantsOfType<P, C = unknown>(
  children: C | ReadonlyArray<C>,
  type: ReactElement<P>['type']
): ReactElement<P>[] {
  return useMemo(() => getChildOfType(children, type), [children, type]);
}

function getChildOfType<P, C = unknown>(
  children: C | ReadonlyArray<C>,
  type: ReactElement<P>['type']
): ReactElement<P>[] {
  return React.Children.toArray(children).flatMap((node) => {
    if (isValidElement<P>(node) && node.type === type) {
      return [node];
    } else if (
      isValidElement<PropsWithChildren<unknown>>(node) &&
      node.props.children
    ) {
      return getChildOfType(node.props.children, type);
    } else {
      return [];
    }
  });
}

export function useNodesBound(): Rect {
  return useStore((s) => getRectOfNodes(Array.from(s.nodeInternals.values())));
}
