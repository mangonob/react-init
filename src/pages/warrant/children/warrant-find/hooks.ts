import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from 'react-use';
import {
  ColumnKey,
  DEFAULT_COLUMNS,
  TABLE_COLUMN_CONFIGS,
  WithKey,
} from './models';

type GetAndSet<T> = [T, Dispatch<SetStateAction<T>>];

function useFixedColumns(): GetAndSet<ColumnKey[]> {
  return useState<ColumnKey[]>([
    'publisher',
    'id',
    'warrantType',
    'exercisePrice',
    'price',
  ]);
}

function useSelectedColumns(): [ColumnKey[], (_: ColumnKey[]) => void] {
  const [v, setV] = useLocalStorage<ColumnKey[]>(
    'SELECTED_WARRANT_LIST_COLUMNS_STORAGE_KEY',
    DEFAULT_COLUMNS
  );
  return [v || DEFAULT_COLUMNS, setV];
}

export interface UseTableColumns {
  visible: ColumnKey[];
  selected: ColumnKey[];
  options: ColumnKey[];
  select: (_: ColumnKey | ColumnKey[]) => void;
  unselect: (_: ColumnKey | ColumnKey[]) => void;
  update: (_: ColumnKey[]) => void;
}

export function useTableColumns(): UseTableColumns {
  const [fixedColumns] = useFixedColumns();
  const [selectedColumns, setSelectedColumns] = useSelectedColumns();

  const visibleColumns = useMemo((): ColumnKey[] => {
    return Object.keys(TABLE_COLUMN_CONFIGS).filter(
      (k) =>
        fixedColumns.includes(k as ColumnKey) ||
        selectedColumns.includes(k as ColumnKey)
    ) as ColumnKey[];
  }, [fixedColumns, selectedColumns]);

  const select = useCallback(
    (k: ColumnKey | ColumnKey[]) => {
      if (Array.isArray(k)) {
        const _k = k.filter((key) => !selectedColumns.includes(key));
        setSelectedColumns([..._k, ...selectedColumns]);
      } else {
        setSelectedColumns([k, ...selectedColumns]);
      }
    },
    [selectedColumns, setSelectedColumns]
  );

  const unselect = useCallback(
    (k: ColumnKey | ColumnKey[]) => {
      if (Array.isArray(k)) {
        setSelectedColumns(selectedColumns.filter((_k) => !k.includes(_k)));
      } else {
        setSelectedColumns(selectedColumns.filter((_k) => _k !== k));
      }
    },
    [selectedColumns, setSelectedColumns]
  );

  const options = useMemo(() => {
    return Object.keys(TABLE_COLUMN_CONFIGS).filter(
      (k) => !fixedColumns.includes(k as ColumnKey)
    ) as ColumnKey[];
  }, [fixedColumns]);

  return {
    visible: visibleColumns,
    selected: selectedColumns,
    options,
    select,
    unselect,
    update: setSelectedColumns,
  };
}

export function useDataSource<T>(list: T[], key: keyof T): WithKey<T>[] {
  return useMemo(() => {
    return list.map((m): WithKey<T> => {
      return {
        key: m[key] as string,
        ...m,
      };
    });
  }, [list, key]);
}
