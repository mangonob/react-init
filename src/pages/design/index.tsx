import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React, { useState } from 'react';
import { Colors, Fonts } from './children';

export default function Design() {
  const [items] = useState<TabsProps['items']>([
    {
      key: 'colors',
      label: 'Colors',
      children: <Colors />,
    },
    {
      key: 'fonts',
      label: 'Fonts',
      children: <Fonts />,
    },
  ]);

  return <Tabs type="card" items={items} />;
}
