import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
  UpdatePasswordCommand,
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
import {
  GetMenuOptionsQuery,
  GetMenuOptionsQueryByRole,
  GetRoleListQuery,
  GetUserAppTypeQuery,
  GetUserByEmailQuery,
  GetUserTypeByUserTypeCodeQuery,
} from '../queries/impl';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { Public } from 'incident-management-commons';

@Controller()
export class UserController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Get('menu-options')
  async listMenuOptions(): Promise<MenuOptionEntity[]> {
    return this._queryBus.execute(new GetMenuOptionsQuery());
  }

  @Get('menu-options/:roleCode')
  async listMenuOptionsByRoleCode(
    @Param('roleCode') roleCode: string,
  ): Promise<MenuOptionEntity[]> {
    return this._queryBus.execute(new GetMenuOptionsQueryByRole(roleCode));
  }

  @Get('role-all')
  async listAllRole(): Promise<RoleEntity[]> {
    return this._queryBus.execute(new GetRoleListQuery());
  }

  @Get('type-all')
  async listAllUserType(): Promise<UserAppTypeEntity[]> {
    return this._queryBus.execute(new GetUserAppTypeQuery());
  }

  @Get('type/:typeCode')
  async getTypeByUserTypeCode(
    @Param('typeCode') typeCode: string,q 
  ): Promise<UserAppTypeEntity> {
    return this._queryBus.execute(new GetUserTypeByUserTypeCodeQuery(typeCode));
  }

  @Get(':email')
  @Public()
  async getUserAppByEmail(
    @Param('email') email: string,
  ): Promise<UserAppEntity> {
    return this._queryBus.execute(new GetUserByEmailQuery(email));
  }

  @Post()
  async registerUser(
    @Body() registerUserDto: UserAppDto,
  ): Promise<UserAppEntity> {
    return this._commandBus.execute(new RegisterUserCommand(registerUserDto));
  }

  @Patch(':email')
  async updatePassword(
    @Param('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this._commandBus.execute(
      new UpdatePasswordCommand(
        email,
        updatePasswordDto.password,
        updatePasswordDto.oldPassword,
      ),
    );
  }

  @Put(':userAppId')
  async updateUser(
    @Body() updateUserDto: UpdateUserAppDto,
    @Param('userAppId', ParseIntPipe) userAppId: number,
  ): Promise<UserAppEntity> {
    return this._commandBus.execute(
      new UpdateUserCommand(updateUserDto, userAppId),
    );
  }

  @Post('role')
  async registerRole(@Body() registerRoleDto: RoleDto): Promise<RoleEntity> {
    return this._commandBus.execute(new RegisterRoleCommand(registerRoleDto));
  }

  @Delete('role/:roleCode')
  async deleteRole(@Param('roleCode') roleCode: string) {
    await this._commandBus.execute(new DeleteRoleCommand(roleCode));
  }

  @Put('role/:roleCode')
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('roleCode') roleCode: string,
  ): Promise<RoleEntity> {
    return this._commandBus.execute(
      new UpdateRoleCommand(updateRoleDto, roleCode),
    );
  }

  @Post('type')
  async registerUserType(
    @Body() registerUserType: UserAppTypeDto,
  ): Promise<UserAppTypeEntity> {
    return this._commandBus.execute(
      new RegisterUserAppTypeCommand(registerUserType),
    );
  }

  @Delete('type/:typeCode')
  async deleteUserType(@Param('typeCode') typeCode: string) {
    await this._commandBus.execute(new DeleteUserAppTypeCommand(typeCode));
  }

  @Put('type/:typeCode')
  async updateUserType(
    @Body() updateUserAppTypeDto: UpdateUserAppTypeDto,
    @Param('typeCode') typeCode: string,
  ): Promise<UserAppTypeEntity> {
    return this._commandBus.execute(
      new UpdateUserAppTypeCommand(updateUserAppTypeDto, typeCode),
    );
  }

  @Post('role-menu-option')
  async registerRoleMenuOption(
    @Body() registerRoleMenuOption: RoleMenuOptionDto,
  ): Promise<RoleMenuOptionEntity> {
    return this._commandBus.execute(
      new RegisterRoleMenuOptionsCommand(registerRoleMenuOption),
    );
  }

  @Delete('menu-options/:roleCode/:menuOptionCode')
  async deleteRoleMenuOption(
    @Param('roleCode') roleCode: string,
    @Param('menuOptionCode') menuOptionCode: string,
  ) {
    await this._commandBus.execute(
      new DeleteRoleMenuOptionCommand(roleCode, menuOptionCode),
    );
  }
}
