import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuOptionsQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuOptionEntity } from '@entities';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { buildMenuTree } from '../../utilities';

@QueryHandler(GetMenuOptionsQuery)
export class GetMenuOptionsHandler
  implements IQueryHandler<GetMenuOptionsQuery>
{
  private readonly _logger = new Logger(GetMenuOptionsHandler.name);

  constructor(
    @InjectRepository(MenuOptionEntity)
    private readonly _menuOptionsRepository: Repository<MenuOptionEntity>,
  ) {}

  async execute(): Promise<MenuOptionEntity[]> {
    this._logger.log('Init command handler');

    const result = await this._menuOptionsRepository.find();

    this._logger.log('List menu options successfully');
    return buildMenuTree(result);
  }
}
