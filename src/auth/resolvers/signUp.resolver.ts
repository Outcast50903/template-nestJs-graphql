import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';

import { SignUpUserService } from '../services/signUp/index.service';

@Resolver('Auth')
export class SignUpAppResolver {
  constructor(private readonly signUpUser: SignUpUserService) {}

  @Mutation(() => Users)
  async signUp(@Args('input') input: CreateUserInput): Promise<Users> {
    const user = await this.signUpUser.signUp(input);

    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return user;
  }
}
