import { RolesBuilder } from 'nestjs-role-protected';

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const rolesPermissions = {
  [Roles.ADMIN]: {},
  [Roles.USER]: {},
};

export const roles = new RolesBuilder(rolesPermissions);
