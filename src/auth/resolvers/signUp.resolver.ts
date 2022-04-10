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
    try {
      return await this.signUpUser.signUp(input);
    } catch {
      throw new HttpException(
        `El correo ${input.email} ya está registrado`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
