import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import DictionaryDiffer from './children/dictionary-differ';

export default function DictionaryDiff() {
  const [items] = useState<TabsProps['items']>([
    {
      key: 'file',
      label: '文件字典',
      children: <DictionaryDiffer />,
    },
    {
      key: 'protocol',
      label: '协议字典',
      children: <DictionaryDiffer />,
    },
  ]);

  return <Tabs type="card" defaultActiveKey="file" items={items}></Tabs>;
}
