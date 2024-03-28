import { SelectProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPublisherOptions } from './api';
import { WarrantModel } from './children/warrant-find/models';
import { useWatchlist } from './children/implied-volatility/children/watchlist-manage/hooks';
import { WatchlistItem } from './children/implied-volatility/children/watchlist-manage/model';
export function useStockOptions(): NonNullable<SelectProps['options']> {
  const [options, setOptions] = useState<NonNullable<SelectProps['options']>>(
    []
  );

  useEffect(() => {
    fetchPublisherOptions()
      .then((opts) => {
        const options = opts.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        options.unshift({
          value: 'ALL',
          label: '全部',
        });
        setOptions(options);
      })
      .catch(() => void 0);
  }, []);

  return options;
}

export function useSalesOptions(): SelectProps['options'] {
  return useMemo<SelectProps['options']>(() => {
    return [
      { value: 'ALL', label: '全部' },
      { value: 'SG', label: '法興' },
      { value: 'BI', label: '中銀' },
      { value: 'BP', label: '法巴' },
      { value: 'CI', label: '信證' },
      { value: 'CS', label: '瑞信' },
      { value: 'CT', label: '花旗' },
      { value: 'DS', label: '星展' },
      { value: 'EA', label: '東亞' },
      { value: 'GJ', label: '國君' },
      { value: 'GS', label: '高盛' },
      { value: 'HS', label: '匯豐' },
      { value: 'HT', label: '海通' },
      { value: 'HU', label: '華泰' },
      { value: 'JP', label: '摩通' },
      { value: 'KS', label: '韓投' },
      { value: 'MB', label: '麥銀' },
      { value: 'MS', label: '摩利' },
      { value: 'UB', label: '瑞銀' },
      { value: 'VT', label: '瑞通' },
    ];
  }, []);
}

export function useAddWatchlist(selected: WarrantModel[]): VoidFunction {
  const addWatchlist = useWatchlist((s) => s.addWatchlist);

  return useCallback(() => {
    const items = selected.map(
      ({ id, name }): WatchlistItem => ({
        assetId: id,
        name: name,
      })
    );
    addWatchlist(items);
  }, [addWatchlist, selected]);
}

export function useRemoveWatchlist(selected: WarrantModel[]): VoidFunction {
  const removeWatchlist = useWatchlist((s) => s.removeWatchlist);

  return useCallback(() => {
    removeWatchlist(selected.map((w) => w.id));
  }, [removeWatchlist, selected]);
}
