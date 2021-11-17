import { GoogleLoginUrlGoogleResolver } from './resolvers/getLoginUrlGoogle.resolver';
import { LoginGoogleResolver } from './resolvers/loginGoogle.resolver';
import { GetLoginUrlGoogleService } from './services/getLoginUrl/index.service';
import { GetUserFromCodeGoogleService } from './services/getUser/index.service';
import { createGoogleUser, GOOGLE_OAUTH } from './creteGoogleOauth';

export const googleProviders = [
  GetLoginUrlGoogleService,
  GetUserFromCodeGoogleService,
  GoogleLoginUrlGoogleResolver,
  GoogleLoginUrlGoogleResolver,
  LoginGoogleResolver,
  {
    provide: GOOGLE_OAUTH,
    useValue: createGoogleUser,
  },
];
