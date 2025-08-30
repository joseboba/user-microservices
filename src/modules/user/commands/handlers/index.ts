import { RegisterUserHandler } from './register-user.handler';
import { RegisterRoleHandler } from './register-role.handler';
import { RegisterUserAppTypeHandler } from './register-user-app-type.handler';
import { RegisterRoleMenuOptionHandler } from './register-role-menu-option.handler';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateRoleHandler } from './update-role.handler';
import { DeleteRoleMenuOptionsHandler } from './delete-role-menu-options.handler';
import { UpdateUserAppTypeHandler } from './update-user-app-type.handler';
import { DeleteRoleHandler } from './delete-role.handler';
import { DeleteUserAppTypeHandler } from './delete-user-app-type.handler';
import { UpdatePasswordHandler } from './update-password.handler';

export const CommandHandlers = [
  DeleteRoleHandler,
  DeleteRoleMenuOptionsHandler,
  DeleteUserAppTypeHandler,
  RegisterUserHandler,
  RegisterRoleHandler,
  RegisterRoleMenuOptionHandler,
  RegisterUserAppTypeHandler,
  UpdatePasswordHandler,
  UpdateRoleHandler,
  UpdateUserHandler,
  UpdateUserAppTypeHandler,
];
