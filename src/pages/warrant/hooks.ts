import { SelectProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchPublisherOptions } from './api';
import { WatchlistItem } from './models';
import { WarrantModel } from './children/warrant-find/models';

export interface WatchlistState {
  watchlist: WatchlistItem[];
  setWatchlist: (_: WatchlistItem[]) => void;
  addWatchlist: (_: WatchlistItem[]) => void;
  removeWatchlist: (_: string[]) => void;
}

export const useWatchlist = create(
  persist<WatchlistState>(
    (set, get) => ({
      watchlist: [],
      setWatchlist: (w) => set({ watchlist: w }),
      addWatchlist: (w) => {
        const oldValue = get().watchlist;
        const newValue = oldValue.slice();
        for (const item of w) {
          const found = newValue.findIndex((w) => w.assetId === item.assetId);
          if (found < 0) {
            newValue.unshift(item);
          }
        }

        if (newValue.length !== oldValue.length) {
          set({ watchlist: newValue });
        }
      },
      removeWatchlist: (w) => {
        const oldValue = get().watchlist;
        const newValue = oldValue.slice();
        for (const assetId of w) {
          const found = newValue.findIndex((w) => w.assetId === assetId);
          if (found >= 0) {
            newValue.splice(found, 1);
          }
        }

        if (newValue.length !== oldValue.length) {
          set({ watchlist: newValue });
        }
      },
    }),
    {
      name: 'ZUSTAND_WATCHLIST_STORAGE_KEY',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function useStockOptions(): NonNullable<SelectProps['options']> {
  const [options, setOptions] = useState<NonNullable<SelectProps['options']>>(
    []
  );

  useEffect(() => {
    fetchPublisherOptions().then((opts) => {
      const options = opts.map(({ id, name }) => ({ value: id, label: name }));
      options.unshift({
        value: 'ALL',
        label: '全部',
      });
      setOptions(options);
    });
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
