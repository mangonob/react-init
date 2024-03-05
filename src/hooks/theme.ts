import create from 'zustand';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  switchTheme: (_: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: 'dark',
  switchTheme: (theme: Theme) => set({ theme }),
  toggleTheme() {
    if (get().theme === 'light') {
      set({ theme: 'dark' });
    } else {
      set({ theme: 'light' });
    }
  },
}));
