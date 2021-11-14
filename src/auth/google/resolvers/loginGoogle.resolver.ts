import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Token } from 'src/auth/entities/token.entity';
import { LoginAuthService } from 'src/auth/services/login/index.service';

import { GetUserFromCodeGoogleService } from '../services/getUser/index.service';

@Resolver('Google')
export class LoginGoogleResolver {
  constructor(
    private readonly googleService: GetUserFromCodeGoogleService,
    private readonly authService: LoginAuthService,
  ) {}

  @Mutation(() => Token)
  async googleLogin(@Args('code') code: string): Promise<Token> {
    const user = await this.googleService.getUserFromCode(code);

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return this.authService.login(user);
  }
}
