import { ICommand } from '@nestjs/cqrs';
import { UpdateUserAppDto } from '@dtos';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly updateUserAppDto: UpdateUserAppDto,
    public readonly userAppId: number,
  ) {}
}
