/**
 * @description 快捷键勾子
 * @author 高炼
 */

import { useCallback, useEffect, useMemo } from 'react';

/**
 * Registe keyboard shortcut
 * @param shortcut Keyboard shortcut (eg: 'Shift+Alt+C')
 * @param callback Keyboard event callback
 */
export function useKeyboardShortcut(
  shortcut: string,
  callback: { (e: KeyboardEvent): void }
) {
  const allowKeys = useAllowKeys();
  const codeMap = useCodeMap();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't allow repeat
      if (e.repeat) return;

      const singleKeys = allowKeys.filter((k) => k.length <= 1);
      const namedKeys = allowKeys.filter((k) => k.length > 1);

      const pattern = new RegExp(
        `^((Shift|Meta|Ctrl|Alt)\\+)*([0-9a-zA-Z${singleKeys
          .map((k) => (/^[[\\\]-]$/.test(k) ? `\\${k}` : k))
          .join('')}]|${namedKeys.join('|')})$`
      );

      if (!pattern.test(shortcut)) {
        throw new Error(
          `Bad key "${shortcut}" is not confirm ${pattern.toString()}`
        );
      }

      const keys = shortcut.split('+');
      const decorators = keys.slice(0, -1);
      const key = keys.slice(-1)[0];
      const decoratedCode = codeMap[key.toUpperCase()];
      if (
        decoratedCode &&
        decoratedCode.startsWith('Shift+') &&
        !decorators.includes('Shift')
      )
        decorators.push('Shift');
      const code =
        decoratedCode && decoratedCode.startsWith('Shift+')
          ? decoratedCode.slice(6)
          : decoratedCode;

      const eventDecorators = [];
      if (e.altKey) eventDecorators.push('Alt');
      if (e.shiftKey) eventDecorators.push('Shift');
      if (e.metaKey) eventDecorators.push('Meta');
      if (e.ctrlKey) eventDecorators.push('Ctrl');

      const decoratorsIsValid =
        JSON.stringify([...decorators].sort()) ===
        JSON.stringify([...eventDecorators].sort());

      if (code === e.code && decoratorsIsValid) {
        e.preventDefault();
        callback(e);
      }
    },
    [shortcut, callback, allowKeys, codeMap]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}

function useAllowKeys() {
  return useMemo(() => {
    const specialChars = '!@#$%^&*()_+|~-=\\`{}[]:";\'<>?,./'.split('');
    const fn = Array.from({ length: 12 })
      .fill(0)
      .map((_, i) => `F${i + 1}`);
    return [...specialChars, ...fn, 'Escape', 'Space', 'Enter', 'Tab'];
  }, []);
}

function useCodeMap(): Record<string, string> {
  return useMemo(() => {
    const digits = Array.from({ length: 10 })
      .fill(0)
      .map((_, i): [string, string] => [i.toString(), `Digit${i}`]);

    const letters = Array.from({ length: 26 })
      .fill(0)
      .map((_, i) => String.fromCodePoint(65 + i))
      .map((c): [string, string] => [c, `Key${c}`]);

    return {
      Esc: 'Escape',
      Escape: 'Escape',
      Space: 'Space',
      Enter: 'Enter',
      Tab: 'Tab',
      ...Object.fromEntries(digits),
      ...Object.fromEntries(letters),
      '!': 'Shift+Digit1',
      '@': 'Shift+Digit2',
      '#': 'Shift+Digit3',
      $: 'Shift+Digit4',
      '%': 'Shift+Digit5',
      '^': 'Shift+Digit6',
      '&': 'Shift+Digit7',
      '*': 'Shift+Digit8',
      '(': 'Shift+Digit9',
      ')': 'Shift+Dight0',
      _: 'Shift+Minus',
      '+': 'Shift+Equal',
      '|': 'Shift+Backslash',
      '~': 'Shift+Backquote',
      '-': 'Minus',
      '=': 'Equal',
      '\\': 'Backslash',
      '`': 'Backquote',
      '{': 'Shift+BracketLeft',
      '}': 'Shift+BracketRight',
      '[': 'BracketLeft',
      ']': 'BracketRight',
      ':': 'Shift+Semicolon',
      '"': 'Shift+Quote',
      ';': 'Semicolon',
      "'": 'Quote',
      '<': 'Shift+Comma',
      '>': 'Shift+Period',
      '?': 'Shift+Slash',
      ',': 'Comma',
      '.': 'Period',
      '/': 'Slash',
    };
  }, []);
}
