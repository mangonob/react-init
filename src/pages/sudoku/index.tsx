import { Button, Flex, Input, Modal, Popover, Spin } from 'antd';
import { useState } from 'react';
import styles from './index.module.scss';
import NumberPad from './number-pad';
import { cell2grid, solveSudoku, unzipSudoku, zipSudoku } from './utils';

export default function Sudoku() {
  const [description, setDescription] = useState(
    'sudoku://MDY1MTU5MjIxMjQ0MjcyMzM1NDIyNDcxNDg0NTEzNTM3NjQxNzE4NzY3ODE1ODYzODg5'
  );
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<number[][]>(
    Array.from({ length: 9 }).map(() => [])
  );

  const renderCells = (i: number) => {
    return Array.from({ length: 9 }).map((_, j) => {
      const [x, y] = cell2grid(i, j);
      return (
        <SudokuCell
          key={j}
          value={values[x][y]}
          onChange={(value) => {
            const newValues = values.map((e) => e.slice());
            newValues[x][y] = value;
            setValues(newValues);
          }}
        />
      );
    });
  };

  const renderUnits = () => {
    return Array.from({ length: 9 }).map((_, i) => {
      return (
        <div key={i} className={styles.unit}>
          {renderCells(i)}
        </div>
      );
    });
  };

  return (
    <Flex gap={20}>
      <Spin spinning={isLoading}>
        <div className={styles.sudoku}>{renderUnits()}</div>
      </Spin>
      <Flex vertical gap={16}>
        <Button
          onClick={async () => {
            setLoading(true);
            try {
              const [result, only] = await solveSudoku(values);
              setValues(result.map((a) => a.slice()));
              if (!only) {
                Modal.confirm({ title: '提示', content: '非唯一解' });
              }
            } catch (error) {
              if (error instanceof Error) {
                Modal.error({ title: 'Error', content: error.message });
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          Sudoku Go!
        </Button>
        <Button
          onClick={() => {
            setValues(Array.from({ length: 9 }).map(() => []));
          }}
        >
          Clear
        </Button>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={() => {
            setDescription(zipSudoku(values));
          }}
        >
          Export
        </Button>
        <Button
          onClick={() => {
            setValues(unzipSudoku(description));
          }}
        >
          Import
        </Button>
      </Flex>
    </Flex>
  );
}

interface SudokuCellProps {
  value: number;
  onChange?: (value: number) => void;
}

function SudokuCell(props: SudokuCellProps) {
  const { value, onChange } = props;
  const [isOpen, setOpen] = useState(false);

  return (
    <Popover
      overlayClassName={styles.sudokuPopover}
      open={isOpen}
      content={
        <NumberPad
          onChange={(v) => {
            setOpen(false);
            onChange?.(v);
          }}
        />
      }
      trigger="click"
      onOpenChange={setOpen}
      placement="bottom"
    >
      <div className={styles.cell}>
        <span>{value}</span>
      </div>
    </Popover>
  );
}
