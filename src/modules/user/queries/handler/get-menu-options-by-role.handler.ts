import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuOptionsQueryByRole } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuOptionEntity, RoleMenuOptionEntity } from '@entities';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { buildMenuTree } from '../../utilities';

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
      where: { roleCode },
      relations: { menuOption: true },
    });

    return buildMenuTree(result.map((e) => e.menuOption));
  }
}
