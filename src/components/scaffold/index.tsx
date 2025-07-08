import { useDrag } from '@use-gesture/react';
import { Layout } from 'antd';
import cc from 'classcat';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet } from 'react-router';
import { useLocalStorage } from 'react-use';
import { useTheme } from 'src/hooks/theme';

import styles from './index.module.scss';
import NavHeader from './nav-header';
import SystemMenu from './system-menu';

export default function Scaffold() {
  const theme = useTheme((s) => s.theme);
  const [menuMount, setMenuMount] = useState<HTMLDivElement>();
  const [isSiderCollapsed = false, setSiderCollapsed] = useLocalStorage(
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
      {menuMount && createPortal(<SystemMenu />, menuMount)}
      <Layout>
        <NavHeader
          isCollapsed={isSiderCollapsed}
          onCollapsed={setSiderCollapsed}
        />
        <Layout>
          <Layout.Sider
            className={cc([
              styles.silder,
              {
                [styles.draging]: isDarging,
              },
            ])}
            width={silderWidth}
            collapsed={isSiderCollapsed}
            collapsedWidth={0}
          >
            <div
              ref={(ref) => setMenuMount(ref ?? void 0)}
              style={{ width: silderWidth }}
              className={styles.menuContainer}
            ></div>
            <div className={styles.resizeHandler} {...bind()}></div>
          </Layout.Sider>
          <Layout.Content className={styles.content}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
