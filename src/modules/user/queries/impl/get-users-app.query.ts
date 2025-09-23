import { IQuery } from '@nestjs/cqrs';
import { BaseJwtPayload } from 'incident-management-commons';

export class GetUsersAppQuery implements IQuery {
  constructor(
    public readonly user: BaseJwtPayload,
    public readonly isAdmin?: boolean,
    public readonly isTechnician?: boolean,
    public readonly search?: string,
  ) {}
}
