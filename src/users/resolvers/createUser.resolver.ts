import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { CreateUserService } from '../services/create/index.service';

@Resolver(() => User)
export class CreateUserResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @Mutation(() => User)
  createEmployee(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.createUserService.create(createUserInput);
  }
}
