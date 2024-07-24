import { NodeProps, Node } from '@xyflow/react';
import { SubwayItem } from './model';
import SubwayItemView from './subway-item-view';
import React from 'react';

export type SubwayItemProps = NodeProps<
  Node<{ item: SubwayItem }, 'SubwayItemNode'>
>;

export default function SubwayItemNode(props: SubwayItemProps) {
  const { data } = props;
  return <SubwayItemView item={data.item}></SubwayItemView>;
}
