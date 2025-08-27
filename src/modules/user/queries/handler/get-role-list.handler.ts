  import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoleListQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities';
import { Repository } from 'typeorm';

@QueryHandler(GetRoleListQuery)
export class GetRoleListHandler implements IQueryHandler<GetRoleListQuery> {
  private readonly _logger = new Logger(GetRoleListHandler.name);

  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute() {
    this._logger.log('Init handler query handler');
    return this._roleRepository.find();
  }
}
