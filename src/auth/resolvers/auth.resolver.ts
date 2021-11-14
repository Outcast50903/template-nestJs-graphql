import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentUserParam } from 'src/helpers/decorators/currentUserParam';
import { CurrentUser, User } from 'src/users/entities/user.entity';
import { FindOneUserService } from 'src/users/services/findOne/index.service';

import { GqlAuthGuard } from '../guards/graphqlAuth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly findOneUsersService: FindOneUserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUserParam() currentUser: CurrentUser): Promise<User> {
    return this.findOneUsersService.findOne(currentUser.id);
  }
}
