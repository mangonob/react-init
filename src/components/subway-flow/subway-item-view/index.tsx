import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { Flex, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import ProgressOutline from 'src/components/progress-outline.tsx';
import { SubwayFlowContext } from '../context';
import { SubwayItem } from '../model';
import styles from './index.module.scss';
import classNames from 'classnames';

export interface SubwayItemViewProps {
  item: SubwayItem;
}

export default function SubwayItemView(props: SubwayItemViewProps) {
  const { item } = props;
  const { id: itemId, count, total, status, subject } = item;
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

  const renderIcon = () => {
    switch (status) {
      case 'error':
        return <CloseCircleFilled />;
      case 'normal':
        return <ClockCircleFilled />;
      case 'progressing':
        return <ClockCircleFilled />;
      case 'success':
        return <CheckCircleFilled />;
    }
  };

  return (
    <div
      className={classNames(styles.subwayItemView, {
        [styles.success]: status === 'success',
        [styles.error]: status === 'error',
      })}
      ref={(ele) => setElement(ele || void 0)}
    >
      <ProgressOutline
        padding={'6px 14px'}
        progressing={status === 'progressing'}
      >
        <Flex vertical align="center" className={styles.content}>
          <Space>
            <div className={styles.icon}>{renderIcon()}</div>
            <span className={styles.progress}>
              {count}/{total}
            </span>
          </Space>
          <span className={styles.taskName}>{subject}</span>
        </Flex>
      </ProgressOutline>
    </div>
  );
}
