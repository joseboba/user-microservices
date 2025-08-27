import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity, UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  private readonly _logger = new Logger(RegisterUserHandler.name);

  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
  ) {}

  async execute(command: RegisterUserCommand): Promise<UserAppEntity> {
    const userToSave = new UserAppEntity();
    const { name, email, password, userTypeCode } = command.userAppDto;
    this._logger.log('Init command handler', { name, email });

    this._logger.log('Validating exist user email', { email });
    const userApp = await this._userAppRepository.findOneBy({ email });
    if (userApp) {
      this._logger.error(`User with email ${email} already exist`);
      throw BusinessErrors.UserEmailAlreadyExist(email);
    }

    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);

    this._logger.log('Validating exist userType', { userTypeCode });
    const userType = await this._userAppTypeRepository.findOneBy({
      userTypeCode,
      isDeleted: false,
    });

    if (!userType) {
      this._logger.error('User type not found', { userTypeCode });
      throw BusinessErrors.UserTypeCodeDoesNotExist(userTypeCode);
    }

    if (!userType.isActive) {
      throw BusinessErrors.UserTypeIsNotActive();
    }

    Object.assign(userToSave, command.userAppDto);
    userToSave.password = newPassword;
    userToSave.userType = userType;

    const user = await this._userAppRepository.save(userToSave);

    this._logger.log('User created successfully');
    return user;
  }
}
