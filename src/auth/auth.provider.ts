import { LoginAppResolver } from './resolvers/appLogin.resolver';
import { SignUpAppResolver } from './resolvers/signUp.resolver';
import { CreateRefreshTokenService } from './services/createRefreshToken/index.service';
import { FindRefreshTokenByIdService } from './services/findRefreshToken/index.service';
import { FindUserOrSignUpAuthService } from './services/findUserOrSingUp/index.service';
import { LoginAuthService } from './services/login/index.service';
import { SignUpUserService } from './services/signUp/index.service';
import { ValidateAppUserService } from './services/validate/index.service';

export const authProviders = [
  FindUserOrSignUpAuthService,
  LoginAppResolver,
  LoginAuthService,
  ValidateAppUserService,
  SignUpAppResolver,
  SignUpUserService,
  CreateRefreshTokenService,
  FindRefreshTokenByIdService,
];
