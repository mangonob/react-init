/**
 * @description Flow chart edge
 * @author 高炼
 */

import React from 'react';
import { Edge } from 'reactflow';
import { ignoreUnused, PickPartial } from './utils';

export type FlowChartEdgeProps = Omit<Edge, 'id'> & PickPartial<Edge, 'id'>;

export function FlowChartEdge(props: FlowChartEdgeProps) {
  ignoreUnused(() => props);
  return <></>;
}
