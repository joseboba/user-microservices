import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersAppQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@QueryHandler(GetUsersAppQuery)
export class GetUsersAppHandler implements IQueryHandler<GetUsersAppQuery> {
  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
  ) {}

  async execute(query: GetUsersAppQuery): Promise<UserAppEntity[]> {
      const { user, search, isAdmin, isTechnician } = query;

      if (!user.isAdmin) {
        throw BusinessErrors.UserIsNotAdmin();
      }

      const qb = this._userAppRepository
        .createQueryBuilder('u')
        .leftJoin('u.userType', 'ut');

      if (isAdmin !== undefined) {
        qb.andWhere('ut.isAdmin = :isAdmin', { isAdmin });
      }
      if (isTechnician !== undefined) {
        qb.andWhere('ut.isTechnical = :isTechnician', { isTechnician });
      }

      if (search !== undefined && String(search).trim() !== '') {
        qb.andWhere('(u.name ILIKE :search OR u.email ILIKE :search)', {
          search: `%${search}%`,
        });
      }

      return await qb.getMany();
  }
}
