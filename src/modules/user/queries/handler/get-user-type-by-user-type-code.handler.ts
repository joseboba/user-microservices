import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserTypeByUserTypeCodeQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetUserTypeByUserTypeCodeQuery)
export class GetUserTypeByUserTypeCodeHandler
  implements IQueryHandler<GetUserTypeByUserTypeCodeQuery>
{
  private readonly _logger = new Logger(GetUserTypeByUserTypeCodeHandler.name);

  constructor(
    @InjectRepository(UserAppTypeEntity)
    private readonly _userTypeRepository: Repository<UserAppTypeEntity>,
  ) {}

  async execute({
    userTypeCode,
  }: GetUserTypeByUserTypeCodeQuery): Promise<UserAppTypeEntity> {
    this._logger.log('Init query handler');

    const userType = await this._userTypeRepository.findOne({
      where: { userTypeCode },
      relations: { role: true },
    });

    if (!userType) {
      throw BusinessErrors.UserTypeCodeDoesNotExist(userTypeCode);
    }

    return userType;
  }
}
