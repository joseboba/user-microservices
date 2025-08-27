import { ICommand } from '@nestjs/cqrs';
import { RoleDto } from '@dtos';

export class RegisterRoleCommand implements ICommand {
  constructor(public readonly roleDto: RoleDto) {}
}
