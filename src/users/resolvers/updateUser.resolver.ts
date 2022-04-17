import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { hashSync } from 'bcryptjs';
import { AccessGuard, UseAbility } from 'nest-casl';
import { omit } from 'ramda';

import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam.decorator';
import { GqlAuthGuard } from 'src/helpers/guard/graphqlAuth.guard';
import { Actions } from 'src/roles';

import { UpdateUserInput } from '../dto/update-user.input';
import { CurrentUser, Users } from '../entities/user.entity';
import { UpdateUserService } from '../services/update/index.service';

@Resolver(() => Users)
export class UpdateUserResolver {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @UseGuards(GqlAuthGuard, AccessGuard)
  @UseAbility(Actions.Update, Users)
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
