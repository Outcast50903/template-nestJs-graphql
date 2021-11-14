import { GoogleLoginUrlGoogleResolver } from './resolvers/getLoginUrlGoogle.resolver';
import { GetLoginUrlGoogleService } from './services/getLoginUrl/index.service';
import { GetUserFromCodeGoogleService } from './services/getUser/index.service';
import { createGoogleUser, GOOGLE_OAUTH } from './creteGoogleOauth';

export const googleProviders = [
  GetLoginUrlGoogleService,
  GetUserFromCodeGoogleService,
  GoogleLoginUrlGoogleResolver,
  GoogleLoginUrlGoogleResolver,
  {
    provide: GOOGLE_OAUTH,
    useValue: createGoogleUser,
  },
];
