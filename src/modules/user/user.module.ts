import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MenuOptionEntity,
  RoleEntity,
  RoleMenuOptionEntity,
  UserAppEntity,
  UserAppTypeEntity,
} from '@entities';
import { UserController } from './controller/user.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handler';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    TypeOrmModule.forFeature([
      MenuOptionEntity,
      RoleEntity,
      RoleMenuOptionEntity,
      UserAppEntity,
      UserAppTypeEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class UserModule {}
