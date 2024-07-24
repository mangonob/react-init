import { ClockCircleFilled } from '@ant-design/icons';
import { Handle, Position } from '@xyflow/react';
import { Flex, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import ProgressOutline from 'src/components/progress-outline.tsx';
import { SubwayFlowContext } from '../context';
import { SubwayItem } from '../model';
import styles from './index.module.scss';

export interface SubwayItemViewProps {
  item: SubwayItem;
}

export default function SubwayItemView(props: SubwayItemViewProps) {
  const { item } = props;
  const { id: itemId } = item;
  const [element, setElement] = useState<HTMLDivElement>();
  const eventObserver = useContext(SubwayFlowContext);

  useEffect(() => {
    if (element) {
      eventObserver.dispatch({
        type: 'sizeChanged',
        id: itemId,
        width: element.clientWidth,
        height: element.clientHeight,
      });

      const sizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries;
        eventObserver.dispatch({
          type: 'sizeChanged',
          id: itemId,
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });

      sizeObserver.observe(element);

      return () => {
        sizeObserver.unobserve(element);
        sizeObserver.disconnect();
      };
    }
  }, [element, itemId, eventObserver]);

  return (
    <div
      className={styles.subwayItemView}
      ref={(ele) => setElement(ele || void 0)}
    >
      <ProgressOutline>
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
        <Flex vertical align="center">
          <Space>
            <ClockCircleFilled />
            <span className={styles.progress}>7/17</span>
          </Space>
          <span className={styles.taskName}>Settlement Task</span>
        </Flex>
      </ProgressOutline>
    </div>
  );
}
