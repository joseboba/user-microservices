import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserAppTypeQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';

@QueryHandler(GetUserAppTypeQuery)
export class GetUserAppTypeHandler
  implements IQueryHandler<GetUserAppTypeQuery>
{
  private readonly _logger = new Logger(GetUserAppTypeHandler.name);

  constructor(
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
  ) {}

  async execute() {
    this._logger.log('Init handler query handler');
    return this._userAppTypeRepository.find();
  }
}
