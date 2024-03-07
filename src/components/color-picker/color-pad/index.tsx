import { Flex, Slider } from 'antd';
import classNames from 'classnames';
import Color from 'color';
import React, { useState } from 'react';

import styles from './index.module.scss';

export interface ColorPadProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPad(props: ColorPadProps) {
  const { value, onChange } = props;

  const [colors] = useState([
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'purple',
    'magenta',
    'gray',
  ]);

  const alpha = Math.ceil(Color(value).alpha() * 255);

  const renderColor = (color: string) => {
    const from = 1;
    const to = 10;

    return (
      <div key={color} className={styles.colors}>
        {Array.from({ length: to - from + 1 })
          .map((_, i) => i + from)
          .map((level) => {
            const colorVar = `--${color}-color-level-${level}`;
            const colorValue = getComputedStyle(document.body).getPropertyValue(
              colorVar
            );
            const isActive =
              value && Color(value).hex() === Color(colorValue).hex();

            return (
              <div
                key={`${color}-${level}`}
                style={{ backgroundColor: `var(${colorVar})` }}
                className={classNames(styles.colorItem, {
                  [styles.colorItemActive]: isActive,
                })}
                onClick={() => onChange?.(colorValue)}
              ></div>
            );
          })}
      </div>
    );
  };

  return (
    <Flex className={styles.colorPad} vertical gap={4}>
      <Flex vertical>{colors.map((c) => renderColor(c))}</Flex>
      <Flex align="center" gap={10}>
        <Slider
          className={styles.alphaSlider}
          tooltip={{ open: false }}
          onChange={(alpha) => {
            const newColor = Color(value)
              .alpha(alpha / 255)
              .hexa();
            onChange?.(newColor);
          }}
          value={alpha}
          min={0}
          max={255}
          step={1}
        />
        <span className={styles.alphaNumber}>{alpha}</span>
      </Flex>
    </Flex>
  );
}
