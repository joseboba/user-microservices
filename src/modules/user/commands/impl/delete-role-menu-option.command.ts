import { ICommand } from '@nestjs/cqrs';

export class DeleteRoleMenuOptionCommand implements ICommand {
  constructor(
    public readonly roleCode: string,
    public readonly menuOptionCode: string,
  ) {}
}
