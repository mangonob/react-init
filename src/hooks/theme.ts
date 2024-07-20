import { useCallback, useEffect, useReducer } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  switchTheme: (_: Theme) => void;
  toggleTheme: () => void;
}

type ThemeAction = { type: 'update'; payload: Theme } | { type: 'toggle' };

export function useTheme(): ThemeState;
export function useTheme<T>(selector: (s: ThemeState) => T): T;
export function useTheme<T>(selector?: (s: ThemeState) => T): unknown {
  const ele = document.body;
  const prefix = 'theme-';
  const storageKey = 'THEME';
  const defaultTheme = (localStorage.getItem(storageKey) ?? 'dark') as Theme;

  const getTheme = useCallback((): Theme => {
    return (Array.from(ele.classList)
      .find((c) => c.startsWith(prefix))
      ?.split('-')[1] ?? 'dark') as Theme;
  }, [ele]);

  const [theme, dispatch] = useReducer((state: Theme, action: ThemeAction) => {
    switch (action.type) {
      case 'toggle':
        return state === 'dark' ? 'light' : 'dark';
      case 'update':
        return action.payload;
    }
    return state;
  }, defaultTheme);

  useEffect(() => {
    const themed = Array.from(ele.classList).filter((c) =>
      c.startsWith(prefix)
    );
    const className = `${prefix}${theme}`;
    themed
      .filter((c) => c !== className)
      .forEach((c) => ele.classList.remove(c));
    if (!ele.classList.contains(className)) {
      ele.classList.add(className);
    }
    if (localStorage.getItem(storageKey) !== theme) {
      localStorage.setItem(storageKey, theme);
    }
  }, [ele, theme]);

  useEffect(() => {
    const observer = new MutationObserver(() =>
      dispatch({ type: 'update', payload: getTheme() })
    );
    observer.observe(ele, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [ele, getTheme]);

  const switchTheme = useCallback(
    (theme: Theme) => dispatch({ type: 'update', payload: theme }),
    []
  );

  const toggleTheme = useCallback(() => dispatch({ type: 'toggle' }), []);

  const s: ThemeState = {
    theme,
    switchTheme,
    toggleTheme,
  };

  return selector ? selector(s) : (s as T);
}
