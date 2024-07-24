import { groupBy } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { SubwayItem } from './model';

export interface BluePrintNode {
  id: string;
  row: number;
  column: number;
  verticalAdjustment?: number;
  children?: string[];
  parents?: string[];
}

type NormalFormBluePrintNode = Omit<BluePrintNode, 'parents'>;

export interface BluePrint {
  nodes: BluePrintNode[];
  isItemHiddenFn?: (_: SubwayItem) => boolean;
}

const defaultIsItemHiddenFn = (item: SubwayItem) => item.total <= 0;

export function useSubwayAutoLayout(items: SubwayItem[], blueprint: BluePrint) {
  const { nodes: _nodes, isItemHiddenFn = defaultIsItemHiddenFn } = blueprint;
  const nodes = useNormalFormNodes(_nodes);

  const isNodeHidden = useCallback(
    (idOrNode: string | NormalFormBluePrintNode) => {
      const nid = typeof idOrNode === 'string' ? idOrNode : idOrNode.id;
      const item = items.find((i) => i.id === nid);
      return item ? isItemHiddenFn(item) : true;
    },
    [isItemHiddenFn, items]
  );

  const visibleNodes = useVisibleNodes(nodes, isNodeHidden);
  const compact = useCompactNodes(visibleNodes);

  return void 0;
}

function useNormalFormNodes(nodes: BluePrintNode[]): NormalFormBluePrintNode[] {
  return useMemo(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const normalform: NormalFormBluePrintNode[] = nodes.flatMap((node) => {
      const { id, children, parents, ...extra } = node;
      if (parents && parents.length > 0) {
        const reverse = parents.flatMap((parent): BluePrintNode[] => {
          const pnode = nodeMap.get(parent);
          if (pnode) {
            const { children: _, ...extra } = pnode;
            return [
              {
                children: [id],
                ...extra,
              },
            ];
          } else {
            return [];
          }
        });
        return [{ id, children, ...extra }, ...reverse];
      } else {
        return node;
      }
    });

    const group = groupBy(normalform, (node) => node.id);
    const merged: NormalFormBluePrintNode[] = Object.entries(group).map(
      ([, nodes]) => {
        const allChildren = nodes.flatMap((m) => m.children ?? []);
        return {
          ...nodes[0],
          children: Array.from(new Set(allChildren)),
        };
      }
    );

    return merged;
  }, [nodes]);
}

function useVisibleNodes(
  nodes: NormalFormBluePrintNode[],
  isNodeHidden: (idOrNode: string | NormalFormBluePrintNode) => boolean
): BluePrintNode[] {
  return useMemo(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const allParent = nodes.map((node) => node.id);
    const allChildren = new Set(
      Array.from(new Set(nodes.flatMap((node) => node.children ?? [])))
    );
    const roots = allParent.filter((id) => !allChildren.has(id));
    const visible: BluePrintNode[] = [];
    const stack = roots.slice();
    const visited = new Map<string, boolean>();
    while (stack.length > 0) {
      const nid = stack.pop()!;
      if (visited.get(nid)) {
        continue;
      }
      visited.set(nid, true);
      const node = nodeMap.get(nid);
      if (node) {
        if (!isNodeHidden(node)) {
          visible.push(node);
        }
        const children = node.children?.slice() ?? [];
        const newChildren = [];
        while (children.length > 0) {
          const child = children.shift()!;
          if (isNodeHidden(child)) {
            const cnode = nodeMap.get(child);
            if (cnode && cnode.children) {
              children.push(...cnode.children);
            }
          } else {
            newChildren.push(child);
          }
        }
        node.children = newChildren;
        stack.push(...newChildren);
      }
    }
    return visible;
  }, [isNodeHidden, nodes]);
}

interface Range {
  maxRow: number;
  minRow: number;
  maxColumn: number;
  minColumn: number;
}

function useCompactNodes(
  nodes: NormalFormBluePrintNode[]
): NormalFormBluePrintNode[] {
  return useMemo(() => {
    const dump = nodes.slice();
    const nodeMap = new Map(dump.map((node) => [node.id, node]));
    const range = nodes.reduce(
      (range: Range, node): Range => {
        const { maxColumn, maxRow, minColumn, minRow } = range;
        const { row, column } = node;
        return {
          maxRow: Math.max(maxRow, row),
          minRow: Math.min(minRow, row),
          maxColumn: Math.max(maxColumn, column),
          minColumn: Math.min(minColumn, column),
        };
      },
      {
        maxColumn: Number.NEGATIVE_INFINITY,
        maxRow: Number.NEGATIVE_INFINITY,
        minColumn: Number.POSITIVE_INFINITY,
        minRow: Number.POSITIVE_INFINITY,
      }
    );
    const { maxRow, maxColumn } = range;
    const map = new Matrix<string>(maxRow, maxColumn);
    for (const node of dump) {
      const { column, row, id } = node;
      map.set(id, row, column);
    }

    console.info('Minimap:');
    console.info(map.toString());

    for (let i = 1; i <= map.row; ++i) {
      const hasAny = map
        .getVector({ row: i })
        .reduce((has, v) => has || !!v, false);
      if (!hasAny) {
        map.removeRow(i);
        i--;
      }
    }

    for (let i = 1; i <= map.column; ++i) {
      const hasAny = map
        .getVector({ column: i })
        .reduce((has, v) => has || !!v, false);
      if (!hasAny) {
        map.removeColumn(i);
        i--;
      }
    }

    console.info('Compact minimap:');
    console.info(map.toString());

    map.forEach((k, i, j) => {
      const node = nodeMap.get(k);
      if (node) {
        node.row = i;
        node.column = j;
      } else {
        console.error('node not found with key', k);
      }
    });

    return dump;
  }, [nodes]);
}

class Matrix<T> {
  private elem: (T | undefined)[][];
  private _column: number;
  private _row: number;

  constructor(row: number, column: number) {
    this.elem = Array.from({ length: row + 1 });
    this._column = column;
    this._row = row;
    for (let i = 0; i < row + 1; ++i) {
      this.elem[i] = Array.from({ length: column + 1 });
    }
  }

  get column(): number {
    return this._column;
  }

  get row(): number {
    return this._row;
  }

  removeColumn(column: number): boolean {
    if (column >= 1 && column <= this.column) {
      for (let i = 0; i <= this.row; ++i) {
        this.elem[i].splice(column, 1);
      }
      this._column -= 1;
      return true;
    } else {
      return false;
    }
  }

  removeRow(row: number): boolean {
    if (row >= 1 && row <= this.row) {
      this.elem.splice(row, 1);
      this._row -= 1;
      return true;
    } else {
      return false;
    }
  }

  getVector(param: { row: number } | { column: number }): (T | undefined)[] {
    if ('row' in param) {
      const { row } = param;
      return this.elem[row].slice(1);
    } else if ('column' in param) {
      const { column } = param;
      const vector: (T | undefined)[] = [];
      for (let i = 1; i <= this.row; ++i) {
        vector.push(this.get(i, column));
      }
      return vector;
    } else {
      return [];
    }
  }

  get(row: number, column: number): T | undefined {
    return this.elem[row][column];
  }

  set(element: T | undefined, row: number, column: number): void {
    this.elem[row][column] = element;
  }

  forEach(fn: (elem: T, row: number, column: number) => void) {
    for (let i = 1; i <= this.row; ++i) {
      for (let j = 1; j <= this.column; ++j) {
        const elem = this.get(i, j);
        if (elem !== void 0) {
          fn(elem, i, j);
        }
      }
    }
  }

  toString(): string {
    const descriptions: string[] = [];
    for (let i = 1; i <= this.row; ++i) {
      const desc: string[] = [];
      for (let j = 1; j <= this.column; ++j) {
        const n = this.get(i, j);
        desc.push(n ? 'x' : ' ');
      }
      descriptions.push(desc.join(''));
    }
    return descriptions.join('\n');
  }
}
