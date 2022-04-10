import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { FindUserOrSignUpAuthService } from 'src/auth/services/findUserOrSingUp/index.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';

import { GOOGLE_OAUTH } from '../../creteGoogleOauth';

@Injectable()
export class GetUserFromCodeGoogleService {
  constructor(
    @Inject(GOOGLE_OAUTH)
    private readonly googleOAuthClient: () => OAuth2Client,
    private readonly findUserOrSignUpAuthService: FindUserOrSignUpAuthService,
  ) {}

  async getUserFromCode(code: string): Promise<Users> {
    const userInput = await this.getUserInputFromCode(code);

    if (!userInput) return null;

    return this.findUserOrSignUpAuthService.findUserOrSignUp(userInput);
  }

  private async getUserInputFromCode(code: string): Promise<CreateUserInput> {
    try {
      const oauth2Client = this.googleOAuthClient();

      const { tokens } = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(tokens);

      const { data: userInfo } = await google
        .oauth2({
          auth: oauth2Client,
          version: 'v2',
        })
        .userinfo.get();

      return {
        googleId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
      };
    } catch {
      throw new ApolloError('Error al iniciar sesión', null, {
        describe: 'Por favor verifique los datos ingresados',
      });
    }
  }
}
