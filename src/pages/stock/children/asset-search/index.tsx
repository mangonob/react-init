import { AutoComplete } from 'antd';
import { AutoCompleteProps } from 'antd/lib';
import React, { useState } from 'react';
import { useSuggestion } from './hooks';

export default function AssetSearch(props: AutoCompleteProps<string>) {
  const { value, onChange, ...extra } = props;

  const [query, setQuery] = useState<string | undefined>(value || void 0);
  const options = useSuggestion(query);

  return (
    <AutoComplete
      value={value}
      onChange={(v, opt) => {
        setQuery(v);
        onChange?.(v, opt);
      }}
      options={options}
      {...extra}
    ></AutoComplete>
  );
}
