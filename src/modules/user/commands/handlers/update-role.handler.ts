import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  private readonly _logger = new Logger(UpdateRoleHandler.name);

  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<RoleEntity> {
    this._logger.log('Init command handler');
    const { updateRoleDto, roleId: roleCode } = command;

    const role = await this._roleRepository.findOneBy({
      roleCode,
      isDeleted: false,
    });

    if (!role) {
      throw BusinessErrors.RoleDoesNotExist(roleCode);
    }

    if (!role.isActive) {
      throw BusinessErrors.RoleIsInactive();
    }

    Object.assign(role, updateRoleDto);
    return this._roleRepository.save(role);
  }
}
