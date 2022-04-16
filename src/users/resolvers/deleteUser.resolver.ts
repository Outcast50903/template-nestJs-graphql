import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { RoleProtected } from 'nestjs-role-protected';

import { GqlAuthGuard } from 'src/auth/guards/graphqlAuth.guard';
import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam';

import { CurrentUser, Users } from '../entities/user.entity';
import { DeleteUsersService } from '../services/delete/index.service';

@Resolver(Users)
export class DeleteUserResolver {
  constructor(private readonly deleteUserService: DeleteUsersService) {}

  @UseGuards(GqlAuthGuard)
  // @RoleProtected({ action: 'delete', resource: 'Users' })
  @Mutation(() => Users)
  deleteUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUserParam() currentUser: CurrentUser,
  ): Promise<Users> {
    return this.deleteUserService.delete(id, currentUser);
  }
}
