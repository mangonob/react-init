import { Transfer, TransferProps } from 'antd';
import { TransferItem } from 'antd/es/transfer';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { useWatchlist } from 'src/pages/warrant/hooks';

import styles from './index.module.scss';

export function WatchlistTransfer(props: TransferProps) {
  const { className, ...extra } = props;

  const watchlist = useWatchlist((s) => s.watchlist);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onSelectChange = useCallback<
    NonNullable<TransferProps['onSelectChange']>
  >((sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  }, []);

  const dataSource = useMemo((): TransferItem[] => {
    return watchlist.map((w) => {
      const { assetId, name } = w;
      return {
        key: assetId,
        title: `${assetId} | ${name}`,
      };
    });
  }, [watchlist]);

  return (
    <Transfer<TransferItem>
      className={classNames(styles.watchlistTransfer, className)}
      dataSource={dataSource}
      render={(r) => r.title ?? ''}
      selectedKeys={selectedKeys}
      onSelectChange={onSelectChange}
      {...extra}
    ></Transfer>
  );
}
