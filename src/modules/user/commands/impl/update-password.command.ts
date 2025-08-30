import { ICommand } from '@nestjs/cqrs';

export class UpdatePasswordCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly oldPassword: string,
  ) {}
}
