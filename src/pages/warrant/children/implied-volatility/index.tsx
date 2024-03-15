import { Button, Col, Flex, Radio, Row, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { useWatchlist } from '../../hooks';
import AssetSearch from '../asset-search';
import { ImpliedVolatilityGraph } from './children/implied-volatility-graph';
import { WatchlistTransfer } from './children/watchlist-transfer';

import styles from './index.module.scss';

export default function ImpliedVolatility() {
  const [targets, setTargets] = useState<string[]>([]);
  const [standardDeviationCount, setStandardDeviationCount] = useState(10);
  const [asset, setAsset] = useState<string>();

  const { watchlist, addWatchlist } = useWatchlist();

  return (
    <Flex vertical className={styles.impliedVolatility} gap={20}>
      <Space size={16}>
        <span className={styles.title}>搜索资产</span>
        <AssetSearch
          className={styles.assetSearch}
          value={asset}
          onChange={setAsset}
        />
        <Button
          type="primary"
          onClick={() => {
            if (asset) {
              const [assetId, name] = asset.split('|');
              if (assetId && name) {
                addWatchlist([{ assetId, name }]);
              }
            }
          }}
        >
          添加
        </Button>
      </Space>
      <WatchlistTransfer targetKeys={targets} onChange={setTargets} />
      <Space>
        <span>标准差天数:</span>
        <Radio.Group
          value={standardDeviationCount}
          onChange={(e) => {
            const v = e.target.value as number | undefined;
            if (v !== undefined) {
              setStandardDeviationCount(v);
            }
          }}
        >
          <Radio.Button value={3}>3</Radio.Button>
          <Radio.Button value={5}>5</Radio.Button>
          <Radio.Button value={10}>10</Radio.Button>
          <Radio.Button value={15}>15</Radio.Button>
          <Radio.Button value={20}>20</Radio.Button>
        </Radio.Group>
        <Slider
          className={styles.countSlider}
          max={30}
          min={3}
          value={standardDeviationCount}
          onChange={setStandardDeviationCount}
        />
        <span>{standardDeviationCount}</span>
      </Space>
      <Row gutter={[20, 20]}>
        {targets.map((id) => {
          const found = watchlist.find((w) => w.assetId === id);
          return (
            <Col key={id} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
              <ImpliedVolatilityGraph
                assetId={id}
                name={found?.name}
                standardDeviationCount={standardDeviationCount}
              />
            </Col>
          );
        })}
      </Row>
    </Flex>
  );
}
