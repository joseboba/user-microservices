import { ICommand } from '@nestjs/cqrs';

export class DeleteUserAppTypeCommand implements ICommand {
  constructor(
    public readonly userTypeCode: string,
  ) {}
}
