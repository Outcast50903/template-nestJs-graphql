import { SetMetadata } from '@nestjs/common';

import { Roles } from 'src/roles';

export const ROLES_KEY = 'roles';

export const ValidateRoles = (...roles: Roles[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
