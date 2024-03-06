import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Layout, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Theme, useTheme } from 'src/hooks/theme';

import darkIcon from 'src/assets/icons/theme-dark.svg';
import lightIcon from 'src/assets/icons/theme-light.svg';

const iconMaps: Record<Theme, string> = {
  light: lightIcon,
  dark: darkIcon,
};

const { Content, Header } = Layout;

import styles from './index.module.scss';
import classNames from 'classnames';

export default function Scaffold() {
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const [isLeftDrawerHidden, setIsLeftDrawerHidden] = useState(true);
  const [isRightDrawerHidden, setIsRightDrawerHidden] = useState(true);

  useEffect(() => {
    const prefix = 'theme-';
    const themed = Array.from(document.body.classList).filter((c) =>
      c.startsWith(prefix)
    );
    const className = `${prefix}${theme}`;
    themed
      .filter((c) => c !== className)
      .forEach((c) => document.body.classList.remove(c));
    if (!document.body.classList.contains(className)) {
      document.body.classList.add(className);
    }
  }, [theme]);

  return (
    <Layout className={styles.scaffold}>
      <Layout>
        <Header className={styles.navHeader}>
          <div
            className={styles.leftDrawerMenu}
            onClick={() => setIsLeftDrawerHidden(false)}
          >
            <MenuOutlined />
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
                  <img
                    className={styles.icon}
                    src={iconMaps[theme]}
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
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Drawer
          className={classNames(styles.drawer, styles.systemDrawer)}
          placement="left"
          width={320}
          open={!isLeftDrawerHidden}
          onClose={() => setIsLeftDrawerHidden(true)}
        >
          <h1>Left</h1>
        </Drawer>
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
