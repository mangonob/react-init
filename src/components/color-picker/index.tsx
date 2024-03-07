import { Popover } from 'antd';
import classNames from 'classnames';
import { isNil } from 'lodash';
import React, { CSSProperties, useEffect, useState } from 'react';
import { ColorPad } from './color-pad';

import styles from './index.module.scss';

export interface ColorPickerProps {
  color?: string;
  defaultColor?: string;
  onChanged?: (color: string) => void;
  className?: string;
  popoverClassName?: string;
  /** If close picker after color been chosen */
  autoClosePopover?: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
  const {
    color,
    onChanged,
    defaultColor,
    autoClosePopover = false,
    className,
    popoverClassName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [_color, setColor] = useState(defaultColor);
  const renderColor = color ?? _color;

  useEffect(() => {
    let isDown = false;
    const downListener = () => (isDown = true);
    const upListener = () => {
      if (isDown) {
        setIsOpen(false);
        isDown = false;
      }
    };

    window.addEventListener('mousedown', downListener);
    window.addEventListener('mouseup', upListener);

    return () => {
      window.removeEventListener('mouseup', upListener);
      window.removeEventListener('mousedown', downListener);
    };
  }, []);

  return (
    <Popover
      content={
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={popoverClassName}
        >
          <ColorPad
            value={renderColor}
            onChange={(c) => {
              onChanged?.(c);
              setColor(c);

              if (autoClosePopover) {
                setIsOpen(false);
              }
            }}
          />
        </div>
      }
      placement="bottomRight"
      open={isOpen}
    >
      <div
        className={classNames(
          styles.colorPicker,
          { [styles.colorPickerActive]: isOpen },
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={classNames(styles.colorBox, {
            [styles.colorBoxClear]: isNil(renderColor),
          })}
          style={{ '--color-picker-color': renderColor } as CSSProperties}
        ></div>
      </div>
    </Popover>
  );
}
