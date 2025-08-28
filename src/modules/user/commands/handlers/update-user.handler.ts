import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity, UserAppTypeEntity } from '@entities';
import { Not, Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';
import { BusinessError } from 'incident-management-commons';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly _logger = new Logger(UpdateUserHandler.name);

  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserAppEntity> {
    this._logger.log('Init command handler');
    const { updateUserAppDto, userAppId } = command;

    const user = await this._userAppRepository.findOne({
      where: {
        userAppId,
      },
      relations: { userType: true },
    });
    if (!user) {
      throw BusinessErrors.UserNotFound();
    }

    if (updateUserAppDto.email !== user.email) {
      const otherUser = await this._userAppRepository.findOne({
        where: {
          userAppId: Not(userAppId),
          email: updateUserAppDto.email,
        },
      });

      if (otherUser) {
        throw BusinessErrors.UserEmailAlreadyExist(updateUserAppDto.email!);
      }
    }

    Object.assign(user, updateUserAppDto);
    if (updateUserAppDto.userTypeCode == user.userType.userTypeCode) {
      return this._userAppRepository.save(user);
    }

    const userType = await this._userAppTypeRepository.findOneBy({
      userTypeCode: updateUserAppDto.userTypeCode,
    });

    if (!userType) {
      throw BusinessErrors.UserTypeCodeDoesNotExist(
        updateUserAppDto.userTypeCode!,
      );
    }

    if (!userType.isActive) {
      throw BusinessErrors.UserTypeIsNotActive();
    }

    user.userType = userType;
    return this._userAppRepository.save(user);
  }
}
