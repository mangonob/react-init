import { create } from 'zustand';
import { WatchlistItem } from './model';
import { createJSONStorage, persist } from 'zustand/middleware';

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
