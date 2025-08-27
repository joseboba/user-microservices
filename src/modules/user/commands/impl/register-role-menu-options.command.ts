import { ICommand } from '@nestjs/cqrs';
import { RoleMenuOptionDto } from '@dtos';

export class RegisterRoleMenuOptionsCommand implements ICommand {
  constructor(public readonly roleMenuOptionDto: RoleMenuOptionDto) {}
}
