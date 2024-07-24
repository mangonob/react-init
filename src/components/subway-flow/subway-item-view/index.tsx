import { ClockCircleFilled } from '@ant-design/icons';
import { Flex, Space } from 'antd';
import React from 'react';
import ProgressOutline from 'src/components/progress-outline.tsx';
import styles from './index.module.scss';
import { Handle, Position } from '@xyflow/react';

export default function SubwayItemView() {
  return (
    <ProgressOutline className={styles.subwayItemView}>
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
  );
}
