import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { hashSync } from 'bcryptjs';
import { omit } from 'ramda';

import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam';
import { ValidateRoles } from 'src/helpers/decorators/roles';
import { GqlAuthGuard } from 'src/helpers/guard/graphqlAuth.guard';
import { Roles } from 'src/roles';

import { UpdateUserInput } from '../dto/update-user.input';
import { CurrentUser, Users } from '../entities/user.entity';
import { UpdateUserService } from '../services/update/index.service';

@Resolver(() => Users)
export class UpdateUserResolver {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @UseGuards(GqlAuthGuard)
  @ValidateRoles(Roles.ADMIN_ROLE)
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
