import {
  BaseEdge,
  Edge,
  EdgeProps,
  GetBezierPathParams,
  getBezierPath,
  getStraightPath,
} from '@xyflow/react';
import React, { useMemo } from 'react';

export type SubwayFlowEdgeData = {
  type: 'sourcePrimary' | 'targetPrimary' | 'default';
  primaryDistance: number;
};

type SubwayFlowEdge = EdgeProps<Edge<SubwayFlowEdgeData, 'SubwayFlowEdge'>>;

export default function SubwayFlowEdge(props: SubwayFlowEdge) {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    ...extra
  } = props;

  const path = useEdgePath(
    {
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
    },
    data
  );

  return <BaseEdge path={path} {...extra} />;
}

function useEdgePath(
  params: GetBezierPathParams,
  data?: SubwayFlowEdgeData
): string {
  return useMemo(() => {
    const { type = 'default', primaryDistance = 0 } = data || {};
    const { sourceX, sourceY, targetX, targetY } = params;
    const direction = Math.sign(targetX - sourceX);

    switch (type) {
      case 'default':
        return getBezierPath(params)[0];
      case 'sourcePrimary': {
        const stopX = sourceX + direction * primaryDistance;
        const stopY = targetY;
        const [curve] = getBezierPath({
          ...params,
          sourceX,
          sourceY,
          targetX: stopX,
          targetY: stopY,
        });
        const [line] = getStraightPath({
          sourceX: stopX,
          sourceY: stopY,
          targetX,
          targetY,
        });
        return [curve, line].join(' ');
      }
      case 'targetPrimary': {
        const stopX = targetX - direction * primaryDistance;
        const stopY = sourceY;
        const [line] = getStraightPath({
          sourceX,
          sourceY,
          targetX: stopX,
          targetY: stopY,
        });
        const [curve] = getBezierPath({
          ...params,
          sourceX: stopX,
          sourceY: stopY,
          targetX: targetX,
          targetY: targetY,
        });
        return [line, curve].join(' ');
      }
    }
  }, [data, params]);
}
