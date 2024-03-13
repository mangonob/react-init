import { SelectProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchPublisherOptions } from './api';
import { Warrant } from './models';

interface WarrantsState {
  warrants: Warrant[];
  setWarrants: (_: Warrant[]) => void;
}

export const useWarrants = create(
  persist<WarrantsState>(
    (set) => ({
      warrants: [],
      setWarrants: (v) => set({ warrants: v }),
    }),
    {
      name: 'ZUSTAND_WARRANTS_STORAGE_KEY',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function useStockOptions(): SelectProps['options'] {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  useEffect(() => {
    fetchPublisherOptions().then((opts) => {
      setOptions(opts.map(({ id, name }) => ({ value: id, label: name })));
    });
  }, []);
  return options;
}

export function useSalesOptions(): SelectProps['options'] {
  return useMemo<SelectProps['options']>(() => {
    return [
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
