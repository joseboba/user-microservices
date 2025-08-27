import { ICommand } from '@nestjs/cqrs';
import { UpdateRoleDto } from '@dtos';

export class UpdateRoleCommand implements ICommand {
  constructor(
    public readonly updateRoleDto: UpdateRoleDto,
    public readonly roleId: string,
  ) {}
}
