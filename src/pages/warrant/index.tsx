import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React, { lazy, Suspense, useState } from 'react';
import { useLocalStorage } from 'react-use';

const ImpliedVolatility = lazy(() => import('./children/implied-volatility'));
const WarrantFind = lazy(() => import('./children/warrant-find'));

export default function Warrant() {
  const [activeKey, setActiveKey] = useLocalStorage(
    'WARRANT_ACTIVE_KEY_STORAGE_KEY',
    'warrant-find'
  );

  const [items] = useState<TabsProps['items']>([
    {
      key: 'warrant-find',
      label: '窝轮检索',
      children: (
        <Suspense>
          <WarrantFind />
        </Suspense>
      ),
    },
    {
      key: 'implied-volatility',
      label: '引申波幅',
      children: (
        <Suspense>
          <ImpliedVolatility />
        </Suspense>
      ),
    },
  ]);

  return (
    <Tabs
      type="card"
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
    ></Tabs>
  );
}
