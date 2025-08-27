import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserAppTypeCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterUserAppTypeCommand)
export class RegisterUserAppTypeHandler
  implements ICommandHandler<RegisterUserAppTypeCommand>
{
  private readonly _logger = new Logger(RegisterUserAppTypeHandler.name);

  constructor(
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(
    command: RegisterUserAppTypeCommand,
  ): Promise<UserAppTypeEntity> {
    const userAppTypeToSave = new UserAppTypeEntity();
    const { userTypeCode, roleCode } = command.userAppTypeDto;
    this._logger.log('Init command handler');

    const userType = await this._userAppTypeRepository.findOneBy({
      userTypeCode,
    });
    if (userType) {
      this._logger.error(`User type with code ${userTypeCode} already exist`);
      throw BusinessErrors.UserAppTypeCodeAlreadyExist(userTypeCode);
    }

    const role = await this._roleRepository.findOneBy({
      roleCode,
      isDeleted: false,
    });

    if (!role) {
      this._logger.error('Role does not exist');
      throw BusinessErrors.RoleDoesNotExist(roleCode);
    }

    if (!role.isActive) {
      this._logger.error('Role is inactive');
      throw BusinessErrors.RoleIsInactive();
    }

    userAppTypeToSave.role = role;
    Object.assign(userAppTypeToSave, command.userAppTypeDto);

    const newUserAppType =
      await this._userAppTypeRepository.save(userAppTypeToSave);

    this._logger.log('User Type created successfully');
    return newUserAppType;
  }
}
