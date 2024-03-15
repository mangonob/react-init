import { Checkbox, Dropdown, MenuProps, Space } from 'antd';
import { DropdownButtonProps } from 'antd/es/dropdown';
import { DropdownProps } from 'antd/lib';
import React, { useMemo, useState } from 'react';
import { ColumnKey, DEFAULT_COLUMNS, TABLE_COLUMN_CONFIGS } from './models';

export interface ColumnsSelectDropdownProps extends DropdownButtonProps {
  onSelect?: (_: ColumnKey | ColumnKey[]) => void;
  onUnselect?: (_: ColumnKey | ColumnKey[]) => void;
  onUpdate?: (_: ColumnKey[]) => void;
  allColumns?: ColumnKey[];
  selectedColumns?: ColumnKey[];
}

export function ColumnsSelectDropdown(props: ColumnsSelectDropdownProps) {
  const [open, setOpen] = useState(false);

  const {
    allColumns = [],
    selectedColumns = [],
    onSelect,
    onUnselect,
    onUpdate,
    style,
    ...extra
  } = props;

  const items: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = allColumns.map((c) => {
      const isSelected = selectedColumns.includes(c);
      return {
        key: c,
        label: (
          <Space>
            <Checkbox checked={isSelected} />
            <span>{TABLE_COLUMN_CONFIGS[c].title}</span>
          </Space>
        ),
        onClick: () => {
          if (isSelected) {
            onUnselect?.(c);
          } else {
            onSelect?.(c);
          }
        },
      };
    });

    items.unshift({
      key: 'reset',
      label: '重置为默认',
      onClick: () => {
        onUpdate?.(DEFAULT_COLUMNS);
      },
    });

    items.unshift({
      key: 'selectAll',
      label: '全选',
      onClick: () => {
        onUpdate?.(allColumns);
      },
    });

    return items;
  }, [allColumns, onSelect, onUnselect, onUpdate, selectedColumns]);

  const onOpenChange: DropdownProps['onOpenChange'] = (open, info) => {
    if (info.source === 'trigger' || open) {
      setOpen(open);
    }
  };

  return (
    <Dropdown.Button
      menu={{ items }}
      style={{ width: 'unset', ...style }}
      {...extra}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      open={open}
      onOpenChange={onOpenChange}
    >
      配置表格列
    </Dropdown.Button>
  );
}
