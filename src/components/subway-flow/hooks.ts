import { groupBy } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { Matrix, Size, SubwayItem, SubwayItemDimension } from './model';
import { Edge, Node } from '@xyflow/react';

export interface BluePrintNode {
  id: string;
  row: number;
  column: number;
  verticalAdjustment?: number;
  children?: string[];
  parents?: string[];
}

export type NormalFormBluePrintNode = Omit<BluePrintNode, 'parents'>;

export interface BluePrint {
  nodes: BluePrintNode[];
  isItemHiddenFn?: (_: SubwayItem) => boolean;
}

const defaultIsItemHiddenFn = (item: SubwayItem) => item.total <= 0;

export interface SubwayAutoLayout {
  visibleItems: SubwayItem[];
  compactNodes: NormalFormBluePrintNode[];
  map: Matrix<string>;
}

export function useSubwayAutoLayout(
  items: SubwayItem[],
  blueprint: BluePrint
): SubwayAutoLayout {
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

  const visibleItems = useMemo(() => {
    return items.filter((item) => !isItemHiddenFn(item));
  }, [isItemHiddenFn, items]);
  const visibleNodes = useVisibleNodes(nodes, isNodeHidden);
  const { compactNodes, map } = useCompactNodes(visibleNodes);

  return { visibleItems, compactNodes, map };
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

function useNodesRange(nodes: NormalFormBluePrintNode[]): Range {
  return useMemo(() => {
    return nodes.reduce(
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
  }, [nodes]);
}

export interface UseCompactNodes {
  compactNodes: NormalFormBluePrintNode[];
  map: Matrix<string>;
}

function useCompactNodes(nodes: NormalFormBluePrintNode[]): UseCompactNodes {
  const range = useNodesRange(nodes);

  return useMemo(() => {
    const dump = nodes.slice();
    const nodeMap = new Map(dump.map((node) => [node.id, node]));
    const { maxRow, maxColumn } = range;
    const map = new Matrix<string>(maxRow, maxColumn);
    for (const node of dump) {
      const { column, row, id } = node;
      map.set(id, row, column);
    }

    // Remove empty row
    for (let i = 1; i <= map.row; ++i) {
      const hasAny = map
        .getVector({ row: i })
        .reduce((has, v) => has || !!v, false);
      if (!hasAny) {
        map.removeRow(i);
        i--;
      }
    }

    // Remove empty column
    for (let i = 1; i <= map.column; ++i) {
      const hasAny = map
        .getVector({ column: i })
        .reduce((has, v) => has || !!v, false);
      if (!hasAny) {
        map.removeColumn(i);
        i--;
      }
    }

    map.forEach((k, i, j) => {
      const node = nodeMap.get(k);
      if (node) {
        node.row = i;
        node.column = j;
      } else {
        console.error('node not found with key', k);
      }
    });

    return {
      compactNodes: dump,
      map,
    };
  }, [nodes, range]);
}

export interface SubwayViewCustomized {
  estimateItemHeight?: number | 'auto';
  rowSpacing?: number;
  columnSpacing?: number;
  columnAlign?: 'center' | 'left' | 'right';
}
export interface UseFlowNodes {
  nodes: Node[];
  containerSize?: Size;
}

export function useFlowNodes(
  items: SubwayItem[],
  compactNodes: NormalFormBluePrintNode[],
  map: Matrix<string>,
  sizes: Map<string, SubwayItemDimension>,
  customized: SubwayViewCustomized
): UseFlowNodes {
  const {
    estimateItemHeight = 'auto',
    rowSpacing = 20,
    columnSpacing = 60,
    columnAlign = 'center',
  } = customized;
  const nodeMap = useMemo(
    () => new Map(compactNodes.map((n) => [n.id, n])),
    [compactNodes]
  );

  return useMemo(() => {
    const flowNodes = items.map((item): Node => {
      return {
        id: item.id,
        position: {
          x: -9999,
          y: -9999,
        },
        data: { item },
        type: 'SubwayItemNode',
      };
    });

    if (sizes.size > 0 && items.length > 0) {
      const rowHeight =
        estimateItemHeight === 'auto'
          ? Array.from(sizes.values())[0].height
          : estimateItemHeight;
      const columnWidths = Array.from<number>({ length: map.column });
      columnWidths[0] = 0;
      for (let i = 1; i <= map.column; ++i) {
        const columnWidth = map
          .getVector({ column: i })
          .reduce((width, nodeId) => {
            if (nodeId) {
              const node = sizes.get(nodeId);
              return node ? Math.max(width, node.width) : width;
            } else {
              return width;
            }
          }, 0);
        columnWidths[i] = columnWidth;
      }

      const flowNodeMap = new Map(flowNodes.map((n) => [n.id, n]));

      map.forEach((id, row, column) => {
        const size = sizes.get(id);
        const flowNode = flowNodeMap.get(id);
        const node = nodeMap.get(id);
        if (flowNode && node && size) {
          const { width } = size;
          const { verticalAdjustment = 0 } = node;
          const y = (row - 1 + verticalAdjustment) * (rowHeight + rowSpacing);
          const widthAcc =
            columnWidths.slice(1, column).reduce((s, w) => s + w, 0) +
            columnSpacing * (column - 1);
          const columnWidth = columnWidths[column];
          const offset = (() => {
            switch (columnAlign) {
              case 'center':
                return (columnWidth - width) / 2;
              case 'left':
                return 0;
              case 'right':
                return columnWidth - width;
            }
          })();
          const x = widthAcc + offset;
          flowNode.position = { x, y };
        }
      });

      // TODO: container Rect
      return { nodes: flowNodes };
    } else {
      return { nodes: flowNodes };
    }
  }, [
    columnAlign,
    columnSpacing,
    estimateItemHeight,
    items,
    map,
    nodeMap,
    rowSpacing,
    sizes,
  ]);
}

export function useFlowEdges(compactNodes: NormalFormBluePrintNode[]): Edge[] {
  return [];
}
