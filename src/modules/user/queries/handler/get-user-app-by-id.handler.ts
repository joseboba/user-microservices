import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserAppByIdQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetUserAppByIdQuery)
export class GetUserAppByIdHandler
  implements IQueryHandler<GetUserAppByIdQuery>
{
  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
  ) {}

  async execute(query: GetUserAppByIdQuery): Promise<UserAppEntity> {
    const { userAppId } = query;

    const result = await this._userAppRepository.findOne({
      where: { userAppId },
      relations: {
        userType: true,
      },
    });

    if (!result) {
      throw BusinessErrors.UserNotFound();
    }

    return result;
  }
}
