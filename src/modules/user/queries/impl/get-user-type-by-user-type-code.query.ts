import { IQuery } from '@nestjs/cqrs';

export class GetUserTypeByUserTypeCodeQuery implements IQuery {
  constructor(public readonly userTypeCode: string) {}
}