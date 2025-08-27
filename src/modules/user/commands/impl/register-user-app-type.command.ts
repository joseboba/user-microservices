import { ICommand } from '@nestjs/cqrs';
import { UserAppTypeDto } from '@dtos';

export class RegisterUserAppTypeCommand implements ICommand {
  constructor(public readonly userAppTypeDto: UserAppTypeDto) {}
}
