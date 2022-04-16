import { RolesBuilder } from 'nestjs-role-protected';

export enum Roles {
  USER_ROLE = 'USER_ROLE',
  ADMIN_ROLE = 'ADMIN_ROLE',
}

const crudAny = {
  'create:any': ['*'],
  'read:any': ['*'],
  'update:any': ['*'],
  'delete:any': ['*'],
};

const rolesPermissions = {
  [Roles.ADMIN_ROLE]: {
    Users: crudAny,
  },
  [Roles.USER_ROLE]: {},
};

export const roles = new RolesBuilder(rolesPermissions);
