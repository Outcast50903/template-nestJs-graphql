import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { GOOGLE_OAUTH } from '../../creteGoogleOauth';

@Injectable()
export class GetLoginUrlGoogleService {
  constructor(
    @Inject(GOOGLE_OAUTH)
    private readonly googleOAuthClient: () => OAuth2Client,
  ) {}

  async getLoginUrl(): Promise<string> {
    return this.googleOAuthClient().generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      response_type: 'code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      prompt: 'select_account',
    });
  }
}
