import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AccessGuard, UseAbility } from 'nest-casl';

import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam.decorator';
import { GqlAuthGuard } from 'src/helpers/guard/graphqlAuth.guard';
import { Actions } from 'src/roles';

import { CurrentUser, Users } from '../entities/user.entity';
import { DeleteUsersService } from '../services/delete/index.service';

@Resolver(Users)
export class DeleteUserResolver {
  constructor(private readonly deleteUserService: DeleteUsersService) {}

  @UseGuards(GqlAuthGuard, AccessGuard)
  @UseAbility(Actions.Delete, Users)
  @Mutation(() => Users)
  deleteUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUserParam() currentUser: CurrentUser,
  ): Promise<Users> {
    return this.deleteUserService.delete(id, currentUser);
  }
}
