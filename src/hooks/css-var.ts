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

/**
 * Retrieves the value of a CSS variable.
 * If an element is provided, the variable is retrieved from that element, otherwise it is retrieved from the document body.
 *
 * @param varName - The name of the CSS variable.
 * @param element - Optional. The element from which to retrieve the CSS variable. If not provided, the document body is used.
 * @returns The value of the CSS variable, or undefined if the variable is not found.
 */
export function getCSSVar(
  varName: string,
  element?: HTMLElement
): string | undefined {
  const _element = element ?? document.body;
  return getComputedStyle(_element).getPropertyValue(varName);
}

/**
 * Custom hook that retrieves the value of a CSS variable.
 *
 * @param varName - The name of the CSS variable.
 * @param element - The optional HTML element to observe for changes. If not provided, the document body will be used.
 * @returns The current value of the CSS variable.
 */
export function useCSSVar(varName: string, element?: HTMLElement) {
  const _element = element ?? document.body;
  const [value, setValue] = useState(getCSSVar(varName, _element));

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setValue(getCSSVar(varName, _element))
    );
    observer.observe(_element, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    });
    return () => observer.disconnect();
  }, [_element, varName]);

  return value;
}
