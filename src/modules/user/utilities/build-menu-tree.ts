import { MenuOptionEntity } from '@entities';

type MenuNode = MenuOptionEntity & { children?: MenuNode[] };
export const buildMenuTree = (options: MenuOptionEntity[]): MenuNode[] => {
  const byCode = new Map<string, MenuNode>();
  for (const opt of options) {
    if (byCode.has(opt.menuOptionCode)) continue;
    byCode.set(opt.menuOptionCode, { ...opt, children: [] });
  }

  const roots: MenuNode[] = [];
  for (const node of byCode.values()) {
    const parentCode = node.menuFatherOption;
    const parent = parentCode ? byCode.get(parentCode) : undefined;

    if (parent) {
      parent.children.push(node);
      continue;
    }

    roots.push(node);
  }

  const sortRecursively = (nodes: MenuNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    for (const n of nodes) {
      if (!n.children || !n.children.length) continue;
      sortRecursively(n.children);
    }
  };
  sortRecursively(roots);

  return roots;
};