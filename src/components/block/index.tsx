import { Flex } from 'antd';
import cc from 'classcat';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './index.module.scss';

export interface BlockProps extends PropsWithChildren<unknown> {
  title?: ReactNode;
  className?: string;
}

export default function Block(props: BlockProps) {
  const { title, className, children } = props;

  return (
    <Flex
      className={cc([styles.block, className])}
      align="stretch"
      vertical
      gap={16}
    >
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </Flex>
  );
}
