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
  const [isLeftDrawerHidden, setIsLeftDrawerHidden] = useState(true);
  const [isRightDrawerHidden, setIsRightDrawerHidden] = useState(true);

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
            onClick={() => setIsLeftDrawerHidden(false)}
          >
            =
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
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
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
