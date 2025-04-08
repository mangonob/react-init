import loader from 'highs';
import { shuffle } from 'lodash-es';

const ROWS = Array.from({ length: 9 }).map((_, i) => i);
const COLS = ROWS.slice();
const VALS = ROWS.slice();

function cross<T>(row: T[], col: T[]): [T, T][] {
  return row.flatMap((r) => col.map((c) => [r, c] as [T, T]));
}

interface LPModel {
  constraints: Array<{
    type: 'less' | 'lessEqual' | 'grater' | 'graterEqual' | 'equal';
    lhs: [number, string][];
    rhs: number;
  }>;
  variables: string[];
}

export async function solveSudoku(
  sudokuValues: number[][]
): Promise<[number[][], boolean]> {
  const solver = await loader({
    locateFile: (file) => 'https://lovasoa.github.io/highs-js/' + file,
  });

  const constraints: LPModel['constraints'] = [];

  for (const r of ROWS) {
    for (const c of COLS) {
      const vars = [];
      for (const v of VALS) {
        vars.push(`x${r}${c}${v}`);
      }
      constraints.push({
        type: 'equal',
        rhs: 1,
        lhs: vars.map((v) => [1, v]),
      });
    }
  }

  for (const v of VALS) {
    for (const r of ROWS) {
      const vars = [];
      for (const c of COLS) {
        vars.push(`x${r}${c}${v}`);
      }
      constraints.push({
        type: 'equal',
        rhs: 1,
        lhs: vars.map((v) => [1, v]),
      });
    }

    for (const c of COLS) {
      const vars = [];
      for (const r of ROWS) {
        vars.push(`x${r}${c}${v}`);
      }
      constraints.push({
        type: 'equal',
        rhs: 1,
        lhs: vars.map((v) => [1, v]),
      });
    }

    for (const [i, j] of cross([0, 1, 2], [0, 1, 2])) {
      const originX = i * 3;
      const originY = j * 3;
      const vars = [];
      for (const [p, q] of cross([0, 1, 2], [0, 1, 2])) {
        vars.push(`x${originX + p}${originY + q}${v}`);
      }
      constraints.push({
        type: 'equal',
        rhs: 1,
        lhs: vars.map((v) => [1, v]),
      });
    }
  }

  for (const r of ROWS) {
    for (const c of COLS) {
      const v = sudokuValues[r][c];
      if (typeof v === 'number' && v > 0) {
        constraints.push({
          type: 'equal',
          rhs: 1,
          lhs: [[1, `x${r}${c}${v - 1}`]],
        });
      }
    }
  }

  const variables: string[] = [];
  for (const r of ROWS) {
    for (const c of COLS) {
      for (const v of VALS) {
        variables.push(`x${r}${c}${v}`);
      }
    }
  }
  const problem = generateLPProblem({ constraints, variables });
  const solution = solver.solve(problem);

  if (solution.Status === 'Optimal') {
    const resolved: number[][] = Array.from({ length: 9 }).map(() => []);
    for (const v of Object.keys(solution.Columns)) {
      const { Primal } = solution.Columns[v];
      if (Primal > 0) {
        const [i, j, k] = v.slice(1).split('').map(Number);
        resolved[i][j] = k + 1;
      }
    }
    return [resolved, true];
  } else {
    throw new Error('No solution found');
  }
}

function generateLPProblem(model: LPModel) {
  const { constraints, variables } = model;

  const lines = ['Maximize'];
  lines.push('obj:', '0', 'Subject To');

  for (const [i, c] of constraints.entries()) {
    const { type, lhs, rhs } = c;
    if (lhs.length > 0) {
      const ruleComps = [`c${i + 1}:`];
      for (const [k, x] of lhs) {
        ruleComps.push(k.toString(), x.toString());
      }
      switch (type) {
        case 'equal':
          ruleComps.push('=');
          break;
        case 'grater':
          ruleComps.push('>');
          break;
        case 'graterEqual':
          ruleComps.push('>=');
          break;
        case 'less':
          ruleComps.push('<');
          break;
        case 'lessEqual':
          ruleComps.push('<=');
          break;
      }
      ruleComps.push(rhs.toString());
      lines.push(ruleComps.join(' '));
    }
  }

  lines.push('Bounds');
  for (const v of variables) {
    lines.push(`0 <= ${v} <= 1`);
  }

  lines.push('Binary');
  for (const v of variables) {
    lines.push(v);
  }

  lines.push('End');
  return lines.join('\n');
}

export function grid2cell(x: number, y: number): [number, number] {
  const i = Math.floor(x / 3);
  const j = Math.floor(y / 3);
  const dx = x - i * 3;
  const dy = y - j * 3;
  return [j * 3 + i, dx + dy * 3];
}

export function cell2grid(cell: number, serial: number): [number, number] {
  const i = cell % 3;
  const j = Math.floor(cell / 3);
  const dx = serial % 3;
  const dy = Math.floor(serial / 3);
  return [i * 3 + dx, j * 3 + dy];
}

export function zipSudoku(values: number[][]): string {
  const data: string[] = [];
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (typeof values[i][j] === 'number') {
        data.push(`${i}${j}${values[i][j]}`);
      }
    }
  }
  return 'sudoku://' + btoa(data.join(''));
}

function splitFixed(text: string, length: number): string[] {
  return text.length <= 3
    ? [text]
    : [text.slice(0, length), ...splitFixed(text.slice(length), length)];
}

export function unzipSudoku(description: string): number[][] {
  const values: number[][] = Array.from({ length: 9 }).map(() => []);
  const dataText = description.replace('sudoku://', '');
  const datas = splitFixed(atob(dataText), 3);
  for (const d of datas) {
    const [x_, y_, value_] = d.split('');
    const x = Number(x_);
    const y = Number(y_);
    const value = Number(value_);
    values[x][y] = value;
  }
  return values;
}

function generateCell(count: number): number[][] {
  const datas = Array.from({ length: count }).map(() => [] as number[]);

  if (count % 2) datas[4][4] = 1;
  const indexes = shuffle(Array.from({ length: 40 }).map((_, i) => i)).slice(
    0,
    Math.floor(count / 2)
  );

  for (const idx of indexes) {
    const i = Math.floor(Number(idx) / 9);
    const j = Number(idx) % 9;
    datas[i][j] = 1;
  }

  return datas;
}

function generate1to9(): number[] {
  return shuffle(range(1, 9));
}

function range(start: number, end?: number): number[] {
  if (end === void 0) {
    return Array.from({ length: start }).map((_, i) => i);
  } else {
    const step = start <= end ? 1 : -1;
    const length = Math.abs(end - start) + 1;
    return Array.from({ length }).map((_, i) => start + i * step);
  }
}

function generateValues(): number[][] {
  const datas = range(9).map(() => range(9).map(() => 0));
  for (let i = 0; i < 3; ++i) {
    const values = generate1to9();
    for (let j = 0; j < 9; ++j) {
      const row = i * 3 + Math.floor(j / 3);
      const col = i * 3 + (j % 3);
      datas[row][col] = values[j];
    }
  }

  return datas;
}

export async function generateSudoku(count: number): Promise<number[][]> {
  let cnt = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const values = generateValues();
    return values;
    const cells = generateCell(count);
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (!cells[i][j]) {
          values[i][j] = 0;
        }
      }
    }
    console.info('generateSudoku try count', ++cnt);

    const [, solved] = await solveSudoku(values);
    if (solved) {
      return values;
    }
  }
}
