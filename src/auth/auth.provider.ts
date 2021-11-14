import { AuthResolver } from './resolvers/auth.resolver';
import { FindUserOrSignUpAuthService } from './services/findUserOrSingUp/index.service';
import { LoginAuthService } from './services/login/index.service';

export const authProviders = [
  FindUserOrSignUpAuthService,
  LoginAuthService,
  AuthResolver,
];
