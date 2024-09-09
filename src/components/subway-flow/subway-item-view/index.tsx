import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { Flex, Space } from 'antd';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import ProgressOutline from 'src/components/progress-outline.tsx';
import { SubwayItem } from '../model';
import styles from './index.module.scss';

export interface SubwayItemViewProps extends HTMLAttributes<HTMLDivElement> {
  item: SubwayItem;
}

export default function SubwayItemView(props: SubwayItemViewProps) {
  const { item, className, ...extra } = props;
  const { count, total, status, subject } = item;

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
      className={classNames(
        styles.subwayItemView,
        {
          [styles.success]: status === 'success',
          [styles.error]: status === 'error',
          [styles.progressing]: status === 'progressing',
        },
        className
      )}
      {...extra}
    >
      <ProgressOutline
        padding={'6px 14px'}
        borderWidth={1}
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
