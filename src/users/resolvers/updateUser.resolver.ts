import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { hashSync } from 'bcryptjs';
import { omit } from 'ramda';

import { GqlAuthGuard } from 'src/auth/guards/graphqlAuth.guard';
import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam';

import { UpdateUserInput } from '../dto/update-user.input';
import { CurrentUser, Users } from '../entities/user.entity';
import { UpdateUserService } from '../services/update/index.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Users)
export class UpdateUserResolver {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Mutation(() => Users)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUserParam() currentUser: CurrentUser,
  ): Promise<Users> {
    updateUserInput.password &&
      (updateUserInput.password = hashSync(updateUserInput.password, 10));

    return this.updateUserService.update(
      updateUserInput.id,
      { $set: omit(['id'], updateUserInput) },
      null,
      currentUser,
    );
  }
}
