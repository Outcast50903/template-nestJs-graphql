import { CleanUsersService } from './services/clean/index.service';
import { CreateUserService } from './services/create/index.service';
import { FindOneUserByEmailService } from './services/findByEmail/index.service';
import { FindOneUserService } from './services/findOne/index.service';
import { ValidateUserService } from './services/validate/index.service';

export const userProviders = [
  CreateUserService,
  FindOneUserService,
  FindOneUserByEmailService,
  ValidateUserService,
  CleanUsersService,
];
