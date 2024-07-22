import { useCallback, useMemo } from 'react';
import { SubwayItem } from './model';

export interface BluePrintNode {
  id: string;
  children?: string[];
}

export interface BluePrint {
  nodes: BluePrintNode[];
  isItemHiddenFn?: (_: SubwayItem) => boolean;
}

const defaultIsItemHiddenFn = (item: SubwayItem) => item.total <= 0;

export function useSubwayAutoLayout(items: SubwayItem[], blueprint: BluePrint) {
  const { nodes, isItemHiddenFn = defaultIsItemHiddenFn } = blueprint;

  const isNodeHidden = useCallback(
    (idOrNode: string | BluePrintNode) => {
      const nid = typeof idOrNode === 'string' ? idOrNode : idOrNode.id;
      const item = items.find((i) => i.id === nid);
      return item ? isItemHiddenFn(item) : true;
    },
    [isItemHiddenFn, items]
  );

  return void 0;
}

function useVisibleNodes(nodes: BluePrintNode[]): BluePrintNode[] {
  return useMemo(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const visible: BluePrintNode[] = [];
    const stack: string[] = [];
    const visited = new Map<string, boolean>();
    if (nodes.length > 0) {
      stack.push(nodes[0].id);
    }
    while (stack.length > 0) {
      const nid = stack.pop()!;
      visited.set(nid, true);
      const children = nodeMap.get(nid)?.children;
      const newChildren: string[] = [];
      for (const child of children ?? []) {
        // TODO
        void 0;
      }
    }
    return visible;
  }, []);
}
