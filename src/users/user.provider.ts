import { DeleteUserResolver } from './resolvers/deleteUser.resolver';
import { FindOneUserResolver } from './resolvers/findOne.resolver';
import { UpdateUserResolver } from './resolvers/updateUser.resolver';
import { CleanUsersService } from './services/clean/index.service';
import { CreateUserService } from './services/create/index.service';
import { DeleteUsersService } from './services/delete/index.service';
import { FindOneUserByEmailService } from './services/findByEmail/index.service';
import { FindOneUserService } from './services/findOne/index.service';
import { UpdateUserService } from './services/update/index.service';

export const userProviders = [
  CreateUserService,
  FindOneUserService,
  FindOneUserByEmailService,
  CleanUsersService,
  UpdateUserResolver,
  DeleteUserResolver,
  FindOneUserResolver,
  UpdateUserService,
  DeleteUsersService,
];
