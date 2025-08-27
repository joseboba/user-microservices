import { ICommand } from '@nestjs/cqrs';
import { UpdateUserAppTypeDto } from '@dtos';

export class UpdateUserAppTypeCommand implements ICommand {
  constructor(
    public readonly updateUserAppTypeDto: UpdateUserAppTypeDto,
    public readonly userTypeCode: string,
  ) {}
}
