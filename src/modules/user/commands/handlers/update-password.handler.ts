import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePasswordCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAppEntity } from '@entities';
import { Repository } from 'typeorm';
import { BusinessErrors } from '../../errors/business-error';
import * as bcrypt from 'bcrypt';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand>
{
  private readonly _logger = new Logger(UpdatePasswordHandler.name);

  constructor(
    @InjectRepository(UserAppEntity)
    private readonly _userAppRepository: Repository<UserAppEntity>,
  ) {}

  async execute(command: UpdatePasswordCommand): Promise<void> {
    this._logger.log('Init command handler');
    const { password, email, oldPassword } = command;

    const findUserByEmail = await this._userAppRepository.findOneBy({
      email,
    });

    if (!findUserByEmail) {
      throw BusinessErrors.UserNotFound();
    }

    const isSamePassword = await bcrypt.compare(
      oldPassword,
      findUserByEmail.password,
    );

    if (!isSamePassword) {
      throw BusinessErrors.InvalidOldPassword();
    }

    const salt = await bcrypt.genSalt();

    findUserByEmail.password = await bcrypt.hash(password, salt);
    await this._userAppRepository.save(findUserByEmail);
  }
}
