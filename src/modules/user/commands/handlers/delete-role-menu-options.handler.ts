import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleMenuOptionCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenuOptionEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(DeleteRoleMenuOptionCommand)
export class DeleteRoleMenuOptionsHandler
  implements ICommandHandler<DeleteRoleMenuOptionCommand>
{
  private readonly _logger = new Logger(DeleteRoleMenuOptionsHandler.name);

  constructor(
    @InjectRepository(RoleMenuOptionEntity)
    private readonly _roleMenuOptionRepository: Repository<RoleMenuOptionEntity>,
  ) {}

  async execute(command: DeleteRoleMenuOptionCommand) {
    this._logger.log('Init command handler');
    const { menuOptionCode, roleCode } = command;

    const roleMenuOption = await this._roleMenuOptionRepository.findOneBy({
      menuOptionCode,
      roleCode,
    });

    if (!roleMenuOption) {
      throw BusinessErrors.RoleMenuOptionDoesNotExist();
    }

    await this._roleMenuOptionRepository.delete(roleMenuOption);
  }
}
