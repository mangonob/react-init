import { ClockCircleFilled } from '@ant-design/icons';
import { Flex, Space } from 'antd';
import React from 'react';
import ProgressOutline from 'src/components/progress-outline.tsx';
import styles from './index.module.scss';
import SubwayFlow from 'src/components/subway-flow';

export default function Examples() {
  return (
    <div className={styles.examples}>
      <Flex wrap gap={16}>
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <ProgressOutline key={i}>
              <Flex vertical align="center">
                <Space>
                  <ClockCircleFilled />
                  <span className={styles.progress}>7/17</span>
                </Space>
                <span className={styles.taskName}>Settlement Task</span>
              </Flex>
            </ProgressOutline>
          );
        })}
        <SubwayFlow />
      </Flex>
    </div>
  );
}
