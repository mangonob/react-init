import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Layout, Space } from 'antd';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useAsync } from 'react-use';
import { useTheme } from 'src/hooks/theme';
import styles from './index.module.scss';

export default function Scaffold() {
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const [isRightDrawerHidden, setIsRightDrawerHidden] = useState(true);
  const [isSiderCollapsed, setSiderCollapsed] = useState(false);

  const { value: themeIconSrc } = useAsync(
    (): Promise<string> =>
      import(`./assets/theme-${theme}.svg`).then(
        (e: { default: string }) => e.default
      ),
    [theme]
  );

  useEffect(() => {
    const prefix = 'theme-';
    const themed = Array.from(document.body.classList).filter((c) =>
      c.startsWith(prefix)
    );
    const className = `${prefix}${theme}`;
    themed
      .filter((c) => c !== className)
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach((c) => document.body.classList.remove(c));
    if (!document.body.classList.contains(className)) {
      document.body.classList.add(className);
    }
  }, [theme]);

  return (
    <Layout className={styles.scaffold}>
      <Layout>
        <Layout.Header className={styles.navHeader}>
          <div
            className={styles.leftDrawerMenu}
            onClick={() => setSiderCollapsed(!isSiderCollapsed)}
          >
            {isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Space>
            <div className={styles.themeSwitcher}>
              <AnimatePresence>
                <motion.div
                  key={theme}
                  className={styles.themeSwitcher}
                  initial={{ opacity: 0, scale: 0, y: '100%' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: '-100%', height: 0 }}
                >
                  {}
                  <img
                    className={styles.icon}
                    src={themeIconSrc}
                    onClick={toggleTheme}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <Avatar
              size="large"
              style={{ backgroundColor: '#f56a00' }}
              onClick={() => setIsRightDrawerHidden(false)}
            >
              U
            </Avatar>
          </Space>
        </Layout.Header>
        <Layout>
          <Layout.Sider
            width={280}
            collapsed={isSiderCollapsed}
            collapsedWidth={0}
          ></Layout.Sider>
          <Layout.Content className={styles.content}>
            <Outlet />
          </Layout.Content>
        </Layout>
        <Drawer
          className={classNames(styles.drawer, styles.userDrawer)}
          placement="right"
          width={320}
          open={!isRightDrawerHidden}
          onClose={() => setIsRightDrawerHidden(true)}
        >
          <h2>Right</h2>
        </Drawer>
      </Layout>
    </Layout>
  );
}
