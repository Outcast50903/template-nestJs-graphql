import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccessGuard, UseAbility } from 'nest-casl';

import { GqlAuthGuard } from 'src/helpers/guard/graphqlAuth.guard';
import { Actions } from 'src/roles';

import { CreateUserInput } from '../dto/create-user.input';
import { Users } from '../entities/user.entity';
import { CreateUserService } from '../services/create/index.service';

@Resolver(() => Users)
export class CreateUserResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @UseGuards(GqlAuthGuard, AccessGuard)
  @UseAbility(Actions.Create, Users)
  @Mutation(() => Users)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Users> {
    return this.createUserService.create(createUserInput);
  }
}
