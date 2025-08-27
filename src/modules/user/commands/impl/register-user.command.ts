import { ICommand } from '@nestjs/cqrs';
import { UserAppDto } from '@dtos';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly userAppDto: UserAppDto) {}
}
