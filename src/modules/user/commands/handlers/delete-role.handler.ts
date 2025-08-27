import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  private readonly _logger = new Logger(DeleteRoleHandler.name);

  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: DeleteRoleCommand) {
    this._logger.log('Init command handler');
    const { roleCode } = command;

    const role = await this._roleRepository.findOneBy({
      roleCode,
    });

    if (!role) {
      throw BusinessErrors.RoleMenuOptionDoesNotExist();
    }

    await this._roleRepository.remove(role);
  }
}
