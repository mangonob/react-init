import { useCallback, useMemo } from 'react';
import { SubwayItem } from './model';
import { groupBy } from 'lodash-es';

export interface BluePrintNode {
  id: string;
  row: number;
  column: number;
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
  console.info('Visible nodes', visibleNodes);
  useCompactNodes(visibleNodes);

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
    const map = createMatrix<string>(maxColumn + 1, maxRow + 1);
    for (const node of dump) {
      const { column, row, id } = node;
      map[column][row] = id;
    }
    for (let i = 1; i < map.length; i++) {
      const hasValue = map[i].reduce((hasAny, ele) => !!ele || hasAny, false);
      if (!hasValue) {
        map.splice(i, 1);
        i--;
      }
    }
    console.info('Minimap:');
    console.info(subwayNodesMinimap(map, maxRow, map.length - 1));
    return dump;
  }, [nodes]);
}

function createMatrix<T = unknown>(
  row: number,
  column: number
): (T | undefined)[][] {
  const matrix = Array.from({ length: row });
  for (let i = 0; i < row; ++i) {
    matrix[i] = Array.from({ length: column });
  }
  return matrix as (T | undefined)[][];
}

function subwayNodesMinimap(
  map: unknown[][],
  row: number,
  column: number
): string {
  const descriptions: string[] = [];
  for (let i = 1; i <= row; ++i) {
    const desc: string[] = [];
    for (let j = 1; j <= column; ++j) {
      const n = map[j][i];
      desc.push(n ? 'x' : ' ');
    }
    descriptions.push(desc.join(''));
  }
  return descriptions.join('\n');
}
