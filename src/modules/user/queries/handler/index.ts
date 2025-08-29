import { GetMenuOptionsHandler } from './get-menu-options.handler';
import { GetUserAppTypeHandler } from './get-user-app-type.handler';
import { GetRoleListHandler } from './get-role-list.handler';
import { GetMenuOptionsByRoleHandler } from './get-menu-options-by-role.handler';

export const QueryHandlers = [
  GetMenuOptionsHandler,
  GetRoleListHandler,
  GetUserAppTypeHandler,
  GetMenuOptionsByRoleHandler
];