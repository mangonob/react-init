import { message } from 'antd';
import classNames from 'classnames';
import color from 'color';
import React, { useCallback } from 'react';
import { useCSSVar } from 'src/hooks/css-var';

import styles from './index.module.scss';

export interface ColorPaletteProps {
  label: string;
  colorName: string;
  defaultIndex?: number;
  from?: number;
  to?: number;
  onChanged?: (color?: string) => void;
}

export function ColorPalette(props: ColorPaletteProps) {
  const {
    defaultIndex = 6,
    from = 1,
    to = 10,
    label,
    colorName,
    onChanged,
  } = props;

  return (
    <div className={styles.colorPalette}>
      <ColorItem
        colorName={colorName}
        index={defaultIndex}
        label={label}
        onChanged={onChanged}
      />
      {Array.from({ length: to - from + 1 }).map((_, i) => (
        <ColorItem
          key={`${colorName}-${i}`}
          colorName={colorName}
          index={i + 1}
          onChanged={onChanged}
        />
      ))}
    </div>
  );
}

interface ColorItemProps {
  colorName: string;
  index: number;
  label?: string;
  onChanged?: (color?: string) => void;
}

function ColorItem(props: ColorItemProps) {
  const { colorName, index, label, onChanged } = props;
  const varName = `--${colorName}-color-level-${index}`;
  const value = useCSSVar(varName);
  const isDark = color(value).gray() < 50;

  const onCopy = useCallback((text?: string) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          message.success(`${text} 拷贝成功`);
        })
        .catch(() => void 0);
    }
  }, []);

  return (
    <div
      className={classNames(
        styles.paletteItem,
        isDark ? styles.dark : styles.light,
        {
          [styles.hasTitle]: label,
        }
      )}
      style={{ backgroundColor: `var(${varName})` }}
      onClick={() => onCopy(value)}
      onMouseEnter={() => onChanged?.(value)}
      onMouseLeave={() => onChanged?.(void 0)}
    >
      {label && <span>{label}</span>}
      <div className={styles.palette}>
        <span>
          {colorName}-{index}
        </span>
        <span>{value}</span>
      </div>
    </div>
  );
}
