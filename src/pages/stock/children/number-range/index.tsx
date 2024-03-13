import { Flex, InputNumber, InputNumberProps } from 'antd';
import React from 'react';

import styles from './index.module.scss';

export interface NumberRangeValue {
  from?: number;
  to?: number;
}

export interface NumberRangeProps
  extends Omit<InputNumberProps, 'value' | 'onChange'> {
  value?: NumberRangeValue;
  onChange?: (value?: NumberRangeValue) => void;
}

export default function NumberRange(props: NumberRangeProps) {
  const { value, onChange, ...extra } = props;

  return (
    <Flex gap={8} align="center" className={styles.numberRange}>
      <InputNumber
        className={styles.input}
        step={0.01}
        value={value?.from}
        onChange={(v) => {
          onChange?.({ ...value, from: v as number });
        }}
        {...extra}
      ></InputNumber>
      <span>至</span>
      <InputNumber
        className={styles.input}
        step={0.01}
        onChange={(v) => {
          onChange?.({ ...value, to: v as number });
        }}
        {...extra}
      ></InputNumber>
    </Flex>
  );
}
