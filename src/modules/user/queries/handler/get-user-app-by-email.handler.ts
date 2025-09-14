import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetUserByEmailQuery)
export class GetUserAppByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<UserAppEntity> {
    const { email } = query;

    const userApp = await this._userAppRepository.findOneBy({
      email,
    });

    if (!userApp) {
      throw BusinessErrors.UserNotFound();
    }

    return userApp;
  }
}
