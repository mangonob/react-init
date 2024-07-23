import { useCallback, useMemo } from 'react';
import { SubwayItem } from './model';
import { groupBy } from 'lodash-es';

export interface BluePrintNode {
  id: string;
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

  return void 0;
}

function useNormalFormNodes(nodes: BluePrintNode[]): NormalFormBluePrintNode[] {
  return useMemo(() => {
    const normalform: NormalFormBluePrintNode[] = nodes.flatMap((node) => {
      const { id, children, parents } = node;
      if (parents && parents.length > 0) {
        const reverse = parents.map((parent): BluePrintNode => {
          return {
            id: parent,
            children: [id],
          };
        });
        return [{ id, children }, ...reverse];
      } else {
        return node;
      }
    });

    const group = groupBy(normalform, (node) => node.id);
    const merged: NormalFormBluePrintNode[] = Object.entries(group).map(
      ([id, nodes]) => {
        const children = nodes.flatMap((m) => m.children ?? []);
        return {
          id,
          children: Array.from(new Set(children)),
        } as NormalFormBluePrintNode;
      }
    );

    return merged;
  }, [nodes]);
}

function useVisibleNodes(
  nodes: BluePrintNode[],
  isNodeHidden: (idOrNode: string | NormalFormBluePrintNode) => boolean
): BluePrintNode[] {
  return useMemo(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const allParent = nodes.map((node) => node.id);
    const allChildren = Array.from(
      new Set(nodes.flatMap((node) => node.children ?? []))
    );
    const simpleLeafs = allChildren.filter((id) => !allParent.includes(id));
    for (const leaf of simpleLeafs) {
      nodeMap.set(leaf, { id: leaf });
    }
    const roots = allParent.filter((id) => !allChildren.includes(id));
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
