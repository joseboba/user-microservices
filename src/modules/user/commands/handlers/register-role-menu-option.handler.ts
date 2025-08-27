import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterRoleMenuOptionsCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuOptionEntity, RoleEntity, RoleMenuOptionEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(RegisterRoleMenuOptionsCommand)
export class RegisterRoleMenuOptionHandler
  implements ICommandHandler<RegisterRoleMenuOptionsCommand>
{
  private readonly _logger = new Logger(RegisterRoleMenuOptionHandler.name);

  constructor(
    @InjectRepository(RoleMenuOptionEntity)
    private readonly _roleMenuOptionRepository: Repository<RoleMenuOptionEntity>,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuOptionEntity)
    private readonly _menuOptionRepository: Repository<MenuOptionEntity>,
  ) {}

  async execute(
    command: RegisterRoleMenuOptionsCommand,
  ): Promise<RoleMenuOptionEntity> {
    const { menuOptionCode, roleCode } = command.roleMenuOptionDto;
    this._logger.log('Init command handler');

    const role = await this._roleRepository.findOneBy({
      roleCode,
      isDeleted: false,
    });
    if (!role) {
      this._logger.error(`Role code ${roleCode} does not exist`);
      throw BusinessErrors.RoleDoesNotExist(roleCode);
    }

    if (!role.isActive) {
      this._logger.error(`Role code ${roleCode} is inactive`);
      throw BusinessErrors.RoleIsInactive();
    }

    const menuOption = await this._menuOptionRepository.findOneBy({
      menuOptionCode,
      isDeleted: false,
    });
    if (!menuOption) {
      this._logger.error(`Menu option ${menuOptionCode} does not exist`);
      throw BusinessErrors.MenuOptionDoesNotExist();
    }

    if (!menuOption.isActive) {
      this._logger.error(`Menu option is inactive ${menuOptionCode}`);
      throw BusinessErrors.MenuOptionIsInactive();
    }

    const roleMenuOption = await this._roleMenuOptionRepository.findOneBy({
      menuOptionCode,
      roleCode,
    });

    if (roleMenuOption) {
      this._logger.error('Menu option already exist');
      throw BusinessErrors.RoleMenuOptionAlreadyExist();
    }

    const entity = new RoleMenuOptionEntity();
    Object.assign(entity, command.roleMenuOptionDto);

    return this._roleMenuOptionRepository.save(entity);
  }
}
