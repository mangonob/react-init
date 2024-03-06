import classNames from 'classnames';
import color from 'color';
import React, { useCallback, useEffect } from 'react';
import { useCSSVarGetter } from 'src/hooks/css-var';

import styles from './index.module.scss';

export interface ColorPaletteProps {
  label: string;
  colorName: string;
  defaultIndex?: number;
  from?: number;
  to?: number;
}

export function ColorPalette(props: ColorPaletteProps) {
  const { defaultIndex = 6, from = 1, to = 10, label, colorName } = props;

  const getColorVar = useCallback(
    (index: number) => {
      return `--${colorName}-color-level-${index}`;
    },
    [colorName]
  );

  const getCSSVarValue = useCSSVarGetter();

  const getHexString = useCallback(
    (index: number) => getCSSVarValue(getColorVar(index)),
    [getCSSVarValue, getColorVar]
  );

  const getAppearence = useCallback(
    (index: number): string => {
      return color(getHexString(index)).gray() > 50
        ? styles.light
        : styles.dark;
    },
    [getHexString]
  );

  return (
    <div className={styles.colorPalette}>
      <div
        className={classNames(styles.defaultItem, getAppearence(defaultIndex))}
        style={{ backgroundColor: `var(${getColorVar(defaultIndex)})` }}
      >
        <span>{label}</span>
        <div className={styles.palette}>
          <span>
            {colorName}-{defaultIndex}
          </span>
          <span>{getHexString(defaultIndex)}</span>
        </div>
      </div>
      {Array.from({ length: to - from + 1 }).map((_, i) => {
        return (
          <div
            key={i}
            className={classNames(styles.paletteItem, getAppearence(i + 1))}
            style={{ backgroundColor: `var(${getColorVar(i + 1)})` }}
          >
            <span>
              {colorName}-{i + from}
            </span>
            <span>{getHexString(i + 1)}</span>
          </div>
        );
      })}
    </div>
  );
}
