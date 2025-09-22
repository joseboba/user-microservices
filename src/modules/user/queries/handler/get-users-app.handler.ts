import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersAppQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity } from '@entities';
import { ILike, Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetUsersAppQuery)
export class GetUsersAppHandler implements IQueryHandler<GetUsersAppQuery> {
  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
  ) {}

  async execute(query: GetUsersAppQuery): Promise<UserAppEntity[]> {
    const { user, search } = query;

    if (!user.isAdmin) {
      throw BusinessErrors.UserIsNotAdmin();
    }

    const searchIsEmpty = search === undefined;
    const parseSearch = `%${search}%`;

    return await this._userAppRepository.find({
      where: [
        { name: searchIsEmpty ? undefined : ILike(parseSearch) },
        { email: searchIsEmpty ? undefined : ILike(parseSearch) },
      ],
    });
  }
}
