import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDrag } from '@use-gesture/react';
import { Avatar, Drawer, Layout, Space } from 'antd';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { useAsync, useLocalStorage } from 'react-use';
import { useTheme } from 'src/hooks/theme';
import styles from './index.module.scss';
import SystemMenu from './system-menu';
import { createPortal } from 'react-dom';
import useHyperMode from 'src/hooks/hyper';

export default function Scaffold() {
  const theme = useTheme((s) => s.theme);
  const isHyperMode = useHyperMode((s) => s.isHyperMode);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const [isRightDrawerHidden, setIsRightDrawerHidden] = useState(true);
  const menuMount = useRef<HTMLDivElement>(null);
  const [isSiderCollapsed, setSiderCollapsed] = useLocalStorage(
    'isSiderCollapsed',
    false
  );
  const originalWidth = useRef(0);
  const [isDarging, setDraging] = useState(false);
  const [silderWidth = 0, setSilderWidth] = useLocalStorage('silderWidth', 260);

  const bind = useDrag((e) => {
    if (e.first) {
      originalWidth.current = silderWidth;
      setDraging(true);
    } else if (e.last) {
      originalWidth.current = 0;
      setDraging(false);
    } else {
      const w = originalWidth.current + e.movement[0];
      setSilderWidth(Math.min(Math.max(w, 160), 500));
    }
  });

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
        <Layout.Header
          className={classNames(styles.navHeader, {
            [styles.hyper]: isHyperMode,
          })}
        >
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
        {menuMount.current && createPortal(<SystemMenu />, menuMount.current)}
        <Layout>
          <Layout.Sider
            className={classNames(styles.silder, {
              [styles.draging]: isDarging,
            })}
            width={silderWidth}
            collapsed={isSiderCollapsed}
            collapsedWidth={0}
          >
            <div
              ref={menuMount}
              style={{ width: silderWidth }}
              className={styles.menuContainer}
            ></div>
            <div className={styles.resizeHandler} {...bind()}></div>
          </Layout.Sider>
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
