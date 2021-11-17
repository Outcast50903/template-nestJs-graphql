import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Login } from '../dto/login.input';
import { Token } from '../entities/token.entity';
import { LoginAuthService } from '../services/login/index.service';
import { ValidateAppUserService } from '../services/validate/index.service';

@Resolver('Auth')
export class LoginAppResolver {
  constructor(
    private readonly loginAuthService: LoginAuthService,
    private readonly validateUser: ValidateAppUserService,
  ) {}

  @Mutation(() => Token)
  async appAuth(
    @Args('input', { type: () => Login }) input: Login,
  ): Promise<Token> {
    const user = await this.validateUser.validateAppUser(input);

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return this.loginAuthService.login(user);
  }
}
