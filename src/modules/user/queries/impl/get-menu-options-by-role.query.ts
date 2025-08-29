import { IQuery } from '@nestjs/cqrs';

export class GetMenuOptionsQueryByRole implements IQuery {
  constructor(public readonly roleId: string) {}
}
