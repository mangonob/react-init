import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import SubwayItemView, { SubwayItemViewProps } from './subway-item-view';

export type SubwayItemNodeData = Pick<SubwayItemViewProps, 'item' | 'onClick'>;

export type SubwayItemProps = NodeProps<
  Node<SubwayItemNodeData, 'SubwayItemNode'>
>;

export default function SubwayItemNode(props: SubwayItemProps) {
  const { data } = props;

  return (
    <div className="subway-item-node" id={data.item.id}>
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
      <SubwayItemView {...data}></SubwayItemView>
    </div>
  );
}
