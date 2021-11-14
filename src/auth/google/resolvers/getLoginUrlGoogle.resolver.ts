import { Query, Resolver } from '@nestjs/graphql';

import { GetLoginUrlGoogleService } from '../services/getLoginUrl/index.service';

@Resolver('Google')
export class GoogleLoginUrlGoogleResolver {
  constructor(private readonly googleService: GetLoginUrlGoogleService) {}

  @Query(() => String)
  async googleLoginUrl(): Promise<string> {
    return this.googleService.getLoginUrl();
  }
}
