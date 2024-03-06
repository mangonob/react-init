import { useEffect, useState } from 'react';
import { useTheme } from './theme';

export function useCSSVarGetter(
  element?: HTMLElement
): (varName: string) => string {
  const _element = element ?? document.body;
  const theme = useTheme((s) => s.theme);
  const [value, setValue] = useState({
    f: (v: string) => getComputedStyle(_element).getPropertyValue(v),
  });

  useEffect(() => {
    setValue({
      f: (v: string) => getComputedStyle(_element).getPropertyValue(v),
    });
  }, [_element, theme]);

  return value.f;
}
