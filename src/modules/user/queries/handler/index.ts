import { GetMenuOptionsHandler } from './get-menu-options.handler';
import { GetUserAppTypeHandler } from './get-user-app-type.handler';
import { GetRoleListHandler } from './get-role-list.handler';
import { GetMenuOptionsByRoleHandler } from './get-menu-options-by-role.handler';
import { GetUserTypeByUserTypeCodeHandler } from './get-user-type-by-user-type-code.handler';
import { GetUserAppByEmailHandler } from './get-user-app-by-email.handler';

export const QueryHandlers = [
  GetMenuOptionsHandler,
  GetRoleListHandler,
  GetUserAppByEmailHandler,
  GetUserAppTypeHandler,
  GetMenuOptionsByRoleHandler,
  GetUserTypeByUserTypeCodeHandler,
];
