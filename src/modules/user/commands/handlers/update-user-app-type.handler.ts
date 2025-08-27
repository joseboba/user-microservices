import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserAppTypeCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserAppTypeEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(UpdateUserAppTypeCommand)
export class UpdateUserAppTypeHandler
  implements ICommandHandler<UpdateUserAppTypeCommand>
{
  private readonly _logger = new Logger(UpdateUserAppTypeHandler.name);

  constructor(
    @InjectRepository(UserAppTypeEntity)
    private readonly _userAppTypeRepository: Repository<UserAppTypeEntity>,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: UpdateUserAppTypeCommand): Promise<UserAppTypeEntity> {
    this._logger.log('Init command handler');
    const { updateUserAppTypeDto, userTypeCode } = command;

    const userType = await this._userAppTypeRepository.findOne({
      where: { userTypeCode },
      relations: { role: true },
    });

    if (!userType) {
      throw BusinessErrors.UserTypeCodeDoesNotExist(userTypeCode);
    }

    if (!userType.isActive) {
      throw BusinessErrors.UserTypeIsNotActive();
    }

    Object.assign(userType, updateUserAppTypeDto);
    if (userType.role.roleCode === updateUserAppTypeDto.roleCode) {
      return this._userAppTypeRepository.save(userType);
    }

    const role = await this._roleRepository.findOneBy({
      roleCode: updateUserAppTypeDto.roleCode,
      isDeleted: false,
    });

    if (!role) {
      throw BusinessErrors.RoleDoesNotExist(updateUserAppTypeDto.roleCode!);
    }

    if (!role.isActive) {
      throw BusinessErrors.RoleIsInactive();
    }

    userType.role = role;
    return this._userAppTypeRepository.save(userType);
  }
}
