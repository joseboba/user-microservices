import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterRoleCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterRoleCommand)
export class RegisterRoleHandler
  implements ICommandHandler<RegisterRoleCommand>
{
  private readonly _logger = new Logger(RegisterRoleHandler.name);

  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: RegisterRoleCommand): Promise<RoleEntity> {
    const roleToSave = new RoleEntity();
    const { roleCode } = command.roleDto;
    this._logger.log('Init command handler');

    const role = await this._roleRepository.findOneBy({ roleCode });
    if (role) {
      this._logger.error(`Role with code ${roleCode} already exist`);
      throw BusinessErrors.RoleCodeAlreadyExist(roleCode);
    }

    Object.assign(roleToSave, command.roleDto);
    const newRole = await this._roleRepository.save(roleToSave);
    this._logger.log('Role created successfully');
    return newRole;
  }
}
