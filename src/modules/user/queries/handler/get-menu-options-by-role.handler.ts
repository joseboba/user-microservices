import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuOptionsQueryByRole } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuOptionEntity, RoleMenuOptionEntity } from '@entities';
import { In, IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { IsIn } from 'class-validator';

@QueryHandler(GetMenuOptionsQueryByRole)
export class GetMenuOptionsByRoleHandler
  implements IQueryHandler<GetMenuOptionsQueryByRole>
{
  private readonly _logger = new Logger(GetMenuOptionsByRoleHandler.name);

  constructor(
    @InjectRepository(RoleMenuOptionEntity)
    private readonly _roleMenuOptionsRepository: Repository<RoleMenuOptionEntity>,
    @InjectRepository(MenuOptionEntity)
    private readonly _menuOptionsRepository: Repository<MenuOptionEntity>,
  ) {}

  async execute(query: GetMenuOptionsQueryByRole): Promise<MenuOptionEntity[]> {
    this._logger.log('Init command handler');
    const { roleId: roleCode } = query;

    const result = await this._roleMenuOptionsRepository.find({
      where: { roleCode, menuOption: { isActive: true } },
      relations: { menuOption: true },
    });

    return buildMenuTree(result.map((e) => e.menuOption));
  }
}

type MenuNode = MenuOptionEntity & { children?: MenuNode[] };
const buildMenuTree = (options: MenuOptionEntity[]): MenuNode[] => {
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
