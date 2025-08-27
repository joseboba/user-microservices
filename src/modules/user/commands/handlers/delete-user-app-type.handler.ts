import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserAppTypeCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(DeleteUserAppTypeCommand)
export class DeleteUserAppTypeHandler
  implements ICommandHandler<DeleteUserAppTypeCommand>
{
  private readonly _logger = new Logger(DeleteUserAppTypeHandler.name);

  constructor(
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
  ) {}

  async execute(command: DeleteUserAppTypeCommand) {
    this._logger.log('Init command handler');
    const { userTypeCode } = command;

    const userType = await this._userAppTypeRepository.findOneBy({
      userTypeCode,
    });

    if (!userType) {
      throw BusinessErrors.UserTypeCodeDoesNotExist(userTypeCode);
    }

    await this._userAppTypeRepository.remove(userType);
  }
}
