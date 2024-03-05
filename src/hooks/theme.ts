import create from 'zustand';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  switchTheme: (_: Theme) => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: 'dark',
  switchTheme: (theme: Theme) => set({ theme }),
}));
