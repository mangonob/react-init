import { Button, Flex, Space, Transfer } from 'antd';
import React from 'react';
import AssetSearch from '../asset-search';

import styles from './index.module.scss';

export default function ImpliedVolatility() {
  return (
    <Flex vertical className={styles.impliedVolatility} gap={20}>
      <Space size={16}>
        <span className={styles.title}>搜索资产</span>
        <AssetSearch className={styles.assetSearch} />
        <Button type="primary">添加</Button>
      </Space>
      <Transfer className={styles.transfer} />
    </Flex>
  );
}
