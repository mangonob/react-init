import { Input, Space } from 'antd';
import { HTMLAttributes } from 'react';

export type Values = [string | undefined, string | undefined];

export interface ValuesProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: Values;
  defaultValue?: Values;
  onChange?: (value: Values) => void;
}

export default function Values(props: ValuesProps) {
  const { value, defaultValue, onChange, ...extra } = props;

  const _value = value ?? defaultValue;

  return (
    <Space {...extra}>
      <Input
        defaultValue={defaultValue?.[0]}
        value={value?.[0]}
        onChange={(e) => {
          onChange?.([e.target.value, _value?.[1]]);
        }}
      />
      <Input
        defaultValue={defaultValue?.[1]}
        value={value?.[1]}
        allowClear
        onChange={(e) => {
          console.info('Second', e.target.value);
          onChange?.([_value?.[0], e.target.value]);
        }}
      />
    </Space>
  );
}
