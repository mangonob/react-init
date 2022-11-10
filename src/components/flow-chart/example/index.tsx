/**
 * @description Flow chart demo
 * @author 高炼
 */

import { Button, Card, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import FlowChart from '..';
import { FlowChartEdge } from '../edge';
import { FlowChartNode } from '../node';

import styles from './index.module.scss';

/** @deprecated To be removed */
export default function FlowChartExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Show Modal
      </Button>
      <Modal
        className={styles.flowChartModal}
        visible={visible}
        centered
        closable
        destroyOnClose
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className={styles.flowChartContainer}>
          <Content />
        </div>
      </Modal>
    </div>
  );
}

export function Content() {
  const numbers = Array.from({ length: 10 });

  const renderNodes = () => {
    return numbers.map((_, idx) => {
      return (
        <FlowChartNode id={idx.toString()} key={idx} yPos={idx * 200}>
          <Handle type="target" position={Position.Top} isConnectable={false} />
          <Card className={styles.flowChartCard}>
            <Space direction="vertical" align="end">
              <Input defaultValue={`Node ${idx + 1}`} />
              <Space direction="horizontal">
                <Button type="default" danger>
                  Cancel
                </Button>
                <Button type="primary">OK</Button>
              </Space>
            </Space>
          </Card>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={false}
          />
        </FlowChartNode>
      );
    });
  };

  const renderEdges = () => {
    return numbers.slice(1).map((_, idx) => {
      return (
        <FlowChartEdge
          key={idx}
          source={`${idx}`}
          target={`${idx + 1}`}
        ></FlowChartEdge>
      );
    });
  };

  return (
    <FlowChart
      style={{
        margin: 'auto',
      }}
    >
      {renderNodes()}
      {renderEdges()}
    </FlowChart>
  );
}
