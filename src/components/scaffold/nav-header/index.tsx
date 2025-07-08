import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space, Switch } from 'antd';
import cc from 'classcat';
import { useTheme } from 'src/hooks';
import useHyperMode from 'src/hooks/hyper';
import styles from './index.module.scss';

export interface NavHeaderProps {
  isCollapsed: boolean;
  onCollapsed: (_: boolean) => void;
}

export default function NavHeader(props: NavHeaderProps) {
  const { isCollapsed, onCollapsed } = props;
  const { toggleTheme, theme } = useTheme();
  const isHyperMode = useHyperMode((s) => s.isHyperMode);

  return (
    <Layout.Header
      className={cc([
        styles.navHeader,
        {
          [styles.hyper]: isHyperMode,
        },
      ])}
    >
      <div
        className={styles.leftDrawerMenu}
        onClick={() => onCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Space>
        <Switch
          className={styles.themeSwitcher}
          unCheckedChildren="暗色"
          checkedChildren="亮色"
          onClick={toggleTheme}
          checked={theme === 'dark'}
        />
        <Avatar className={styles.avatar} size="large" onClick={() => void 0}>
          U
        </Avatar>
      </Space>
    </Layout.Header>
  );
}
