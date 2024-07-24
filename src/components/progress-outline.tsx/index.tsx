import classNames from 'classnames';
import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { kebabCase, pascalCase } from 'src/utils';
import styles from './index.module.scss';

export interface ProgressOutlineProps extends HTMLAttributes<HTMLDivElement> {
  background?: CSSProperties['color'];
  border?: CSSProperties['color'];
  borderTrace?: CSSProperties['color'];
  borderWidth?: CSSProperties['borderWidth'];
  borderRadius?: CSSProperties['borderRadius'];
  children?: ReactNode;
  padding?: CSSProperties['padding'];
  progressing?: boolean;
}

export default function ProgressOutline(props: ProgressOutlineProps) {
  const {
    children,
    className,
    style,
    borderWidth = '2px',
    borderRadius = '9999px',
    padding = '8px 16px',
    border = 'var(--border-color-secondary)',
    borderTrace = 'var(--border-color-primary)',
    background = 'var(--system-background-color)',
    progressing = true,
    ...extra
  } = props;

  const variables = {
    border,
    borderTrace,
    background,
    borderWidth: withUnit(borderWidth),
    borderRadius: withUnit(borderRadius),
    padding: withUnit(padding),
  };

  const injection = Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [
      '--' + kebabCase('progressOutline' + pascalCase(key)),
      value,
    ])
  );

  return (
    <div
      className={classNames(
        styles.progressOutline,
        { [styles.progressing]: progressing },
        className
      )}
      style={{ ...injection, ...style } as CSSProperties}
      {...extra}
    >
      {children}
    </div>
  );
}

function withUnit(v: string | number): string {
  return typeof v === 'number' ? `${v}px` : v;
}
