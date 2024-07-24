import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import { SubwayItem } from './model';
import SubwayItemView from './subway-item-view';

export type SubwayItemProps = NodeProps<
  Node<{ item: SubwayItem }, 'SubwayItemNode'>
>;

export default function SubwayItemNode(props: SubwayItemProps) {
  const { data } = props;

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, marginLeft: 10 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, marginRight: 10 }}
      />
      <SubwayItemView item={data.item}></SubwayItemView>
    </div>
  );
}
