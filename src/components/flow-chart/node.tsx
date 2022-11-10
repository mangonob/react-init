/**
 * @description Flow chart node
 * @author 高炼
 */

import React, { PropsWithChildren } from 'react';
import { NodeProps } from 'reactflow';
import { ignoreUnused, PickPartial, PickRequired } from './utils';

export type FlowChartNodeProps = PropsWithChildren<
  PickPartial<NodeProps, 'xPos' | 'yPos'> & PickRequired<NodeProps, 'id'>
>;

export function FlowChartNode(props: FlowChartNodeProps) {
  ignoreUnused(() => props);
  return <></>;
}
