import { IQuery } from '@nestjs/cqrs';

export class GetUserAppByIdQuery implements IQuery {
  constructor(public readonly userAppId: number) {}
}
