import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Outlet } from 'react-router';
import { useLocalStorage } from 'react-use';

import styles from './index.module.scss';
import SystemMenu from './system-menu';

export default function Scaffold() {
  const [isCollapsed = false, setIsCollapsed] = useLocalStorage(
    'IS_SYSTEM_MENU_COLLAPSED',
    false
  );

  return (
    <Layout className={styles.scaffold}>
      <Sider
        collapsible
        collapsedWidth={50}
        collapsed={isCollapsed}
        onCollapse={setIsCollapsed}
      >
        <SystemMenu></SystemMenu>
      </Sider>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
}
