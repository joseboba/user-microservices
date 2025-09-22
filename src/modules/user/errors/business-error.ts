import { BusinessError } from 'incident-management-commons';

export class BusinessErrors {
  public static UserEmailAlreadyExist(email: string) {
    return new BusinessError(
      'USER.UserAlreadyExistWithEmail',
      'Email already assign to another user',
      { email },
    );
  }

  public static UserTypeCodeDoesNotExist(code: string) {
    return new BusinessError(
      'USER.UserTypeCodeDoesNotExist',
      'User type does not exist',
      { code },
    );
  }

  public static UserTypeIsNotActive() {
    return new BusinessError(
      'USER.UserTypeIsNotActive',
      'User type is not active',
    );
  }

  public static RoleIsInactive() {
    return new BusinessError('USER.RoleIsInactive', 'Role is not active');
  }

  public static RoleDoesNotExist(role: string) {
    return new BusinessError('USER.RoleDoesNotExist', 'Role does not exist', {
      role,
    });
  }

  public static RoleCodeAlreadyExist(role: string) {
    return new BusinessError(
      'USER.RoleCodeAlreadyExist',
      'Role already assign to another role',
      { role },
    );
  }

  public static UserAppTypeCodeAlreadyExist(userTypeCode: string) {
    return new BusinessError(
      'USER.UserAppTypeCodeAlreadyExist',
      'User type code assign to another user type',
      { userTypeCode },
    );
  }

  public static MenuOptionDoesNotExist() {
    return new BusinessError(
      'USER.MenuOptionDoesNotExist',
      'Menu option does not exist',
    );
  }

  public static MenuOptionIsInactive() {
    return new BusinessError(
      'USER.MenuOptionIsInactive',
      'Menu option is inactive',
    );
  }

  public static RoleMenuOptionAlreadyExist() {
    return new BusinessError(
      'USER.RoleMenuOptionAlreadyExist',
      'Role menu option already exist',
    );
  }

  public static UserNotFound() {
    return new BusinessError('USER.UserNotFound', 'User was not find');
  }

  public static RoleMenuOptionDoesNotExist() {
    return new BusinessError(
      'USER.RoleMenuOptionDoesNotExist',
      'The role menu option assignment does not exist',
    );
  }

  public static InvalidOldPassword() {
    return new BusinessError(
      'USER.InvalidOldPassword',
      'Old password sent by user, is not valid',
    );
  }

  public static UserIsNotAdmin() {
    return new BusinessError('USER.UserIsNotAdmin', 'User is not admin');
  }
}
