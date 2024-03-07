import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  switchTheme: (_: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = create(
  persist<ThemeState>(
    (set, get) => ({
      theme: 'light',
      switchTheme: (theme: Theme) => set({ theme }),
      toggleTheme() {
        if (get().theme === 'light') {
          set({ theme: 'dark' });
        } else {
          set({ theme: 'light' });
        }
      },
    }),
    {
      name: 'ZUSTAND_THEME_STORAGE_KEY',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
