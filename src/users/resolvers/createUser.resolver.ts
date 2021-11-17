import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { Users } from '../entities/user.entity';
import { CreateUserService } from '../services/create/index.service';

@Resolver(() => Users)
export class CreateUserResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @Mutation(() => Users)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Users> {
    return this.createUserService.create(createUserInput);
  }
}
