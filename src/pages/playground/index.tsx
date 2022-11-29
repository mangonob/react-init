import { Tabs } from 'antd';
import React from 'react';
import FlowChartExample from 'src/components/flow-chart/example';
import { ZustandExmaple } from '../examples';
import styles from './index.module.scss';

export default function Playground() {
  return (
    <Tabs defaultActiveKey={'0'} className={styles.playground}>
      <Tabs.TabPane tab="React Flow" key="0">
        <FlowChartExample />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Zustand" key="1">
        <ZustandExmaple />
      </Tabs.TabPane>
    </Tabs>
  );
}
