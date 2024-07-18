import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface HyperModeState {
  isHyperMode: boolean;
  setHyperMode: (isHyperMode: boolean) => void;
}

const useHyperMode = create(
  persist<HyperModeState>(
    (set) => {
      return {
        isHyperMode: false,
        setHyperMode(isHyperMode) {
          set({ isHyperMode });
        },
      };
    },
    {
      name: 'HYPER_MODE_STORAGE_KEY',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHyperMode;
