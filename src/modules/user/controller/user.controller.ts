import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  RoleDto,
  RoleMenuOptionDto,
  UpdateRoleDto,
  UpdateUserAppDto,
  UpdateUserAppTypeDto,
  UserAppDto,
  UserAppTypeDto,
} from '@dtos';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  DeleteRoleCommand,
  DeleteRoleMenuOptionCommand,
  DeleteUserAppTypeCommand,
  RegisterRoleCommand,
  RegisterRoleMenuOptionsCommand,
  RegisterUserAppTypeCommand,
  RegisterUserCommand,
  UpdateRoleCommand,
  UpdateUserAppTypeCommand,
  UpdateUserCommand,
} from '../commands/impl';
import {
  MenuOptionEntity,
  RoleEntity,
  RoleMenuOptionEntity,
  UserAppEntity,
  UserAppTypeEntity,
} from '@entities';
import { Public } from 'incident-management-commons';
import {
  GetMenuOptionsQuery, GetMenuOptionsQueryByRole,
  GetRoleListQuery,
  GetUserAppTypeQuery,
} from '../queries/impl';

@Controller()
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  @Public()
  async registerUser(
    @Body() registerUserDto: UserAppDto,
  ): Promise<UserAppEntity> {
    return this._commandBus.execute(new RegisterUserCommand(registerUserDto));
  }

  @Put(':userAppId')
  @Public()
  async updateUser(
    @Body() updateUserDto: UpdateUserAppDto,
    @Param('userAppId', ParseIntPipe) userAppId: number,
  ): Promise<UserAppEntity> {
    return this._commandBus.execute(
      new UpdateUserCommand(updateUserDto, userAppId),
    );
  }

  @Post('role')
  @Public()
  async registerRole(@Body() registerRoleDto: RoleDto): Promise<RoleEntity> {
    return this._commandBus.execute(new RegisterRoleCommand(registerRoleDto));
  }

  @Delete('role/:roleCode')
  @Public()
  async deleteRole(@Param('roleCode') roleCode: string) {
    await this._commandBus.execute(new DeleteRoleCommand(roleCode));
  }

  @Put('role/:roleCode')
  @Public()
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('roleCode') roleCode: string,
  ): Promise<RoleEntity> {
    return this._commandBus.execute(
      new UpdateRoleCommand(updateRoleDto, roleCode),
    );
  }

  @Get('role-all')
  @Public()
  async listAllRole(): Promise<RoleEntity[]> {
    return this._queryBus.execute(new GetRoleListQuery());
  }

  @Post('type')
  @Public()
  async registerUserType(
    @Body() registerUserType: UserAppTypeDto,
  ): Promise<UserAppTypeEntity> {
    return this._commandBus.execute(
      new RegisterUserAppTypeCommand(registerUserType),
    );
  }

  @Get('type-all')
  @Public()
  async listAllUserType(): Promise<UserAppTypeEntity[]> {
    return this._queryBus.execute(new GetUserAppTypeQuery());
  }

  @Delete('type/:typeCode')
  @Public()
  async deleteUserType(@Param('typeCode') typeCode: string) {
    await this._commandBus.execute(new DeleteUserAppTypeCommand(typeCode));
  }

  @Put('type/:typeCode')
  @Public()
  async updateUserType(
    @Body() updateUserAppTypeDto: UpdateUserAppTypeDto,
    @Param('typeCode') typeCode: string,
  ): Promise<UserAppTypeEntity> {
    return this._commandBus.execute(
      new UpdateUserAppTypeCommand(updateUserAppTypeDto, typeCode),
    );
  }

  @Post('role-menu-option')
  @Public()
  async registerRoleMenuOption(
    @Body() registerRoleMenuOption: RoleMenuOptionDto,
  ): Promise<RoleMenuOptionEntity> {
    return this._commandBus.execute(
      new RegisterRoleMenuOptionsCommand(registerRoleMenuOption),
    );
  }

  @Get('menu-options')
  @Public()
  async listMenuOptions(): Promise<MenuOptionEntity[]> {
    return this._queryBus.execute(new GetMenuOptionsQuery());
  }

  @Get('menu-options/:roleCode')
  @Public()
  async listMenuOptionsByRoleCode(
    @Param('roleCode') roleCode: string,
  ): Promise<MenuOptionEntity[]> {
    return this._queryBus.execute(new GetMenuOptionsQueryByRole(roleCode));
  }

  @Delete('menu-options/:roleCode/:menuOptionCode')
  @Public()
  async deleteRoleMenuOption(
    @Param('roleCode') roleCode: string,
    @Param('menuOptionCode') menuOptionCode: string,
  ) {
    await this._commandBus.execute(
      new DeleteRoleMenuOptionCommand(roleCode, menuOptionCode),
    );
  }
}
