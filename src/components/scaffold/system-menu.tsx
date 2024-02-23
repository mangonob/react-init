import {
  FileSyncOutlined,
  ForkOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function SystemMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      selectedKeys={[location.pathname]}
      mode="inline"
      onClick={({ keyPath }) => {
        let path = keyPath.join('/');
        if (!path.startsWith('/')) path = '/' + path;
        navigate(path);
      }}
      items={[
        {
          key: '/protocol-dictionary',
          label: '协议字典',
          icon: <ReadOutlined />,
        },
        {
          key: '/dictionary-diff',
          label: '字典对比',
          icon: <ForkOutlined />,
        },
        {
          key: '/file-parser',
          label: '文件解析',
          icon: <FileSyncOutlined />,
        },
      ]}
    />
  );
}
