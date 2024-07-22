import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

export interface ProgressOutlineProps extends HTMLAttributes<HTMLDivElement> {
  background?: string;
  border?: string;
  borderTrace?: string;
  children?: ReactNode;
}

export default function ProgressOutline(props: ProgressOutlineProps) {
  const { children, className, style, ...extra } = props;

  return (
    <div
      className={classNames(styles.progressOutline, className)}
      style={{} as CSSProperties}
      {...extra}
    >
      {children}
    </div>
  );
}
