import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { AccessGuard, UseAbility } from 'nest-casl';

import { GqlAuthGuard } from 'src/helpers/guard/graphqlAuth.guard';
import { Actions } from 'src/roles';

import { Users } from '../entities/user.entity';
import { FindOneUserService } from '../services/findOne/index.service';

@Resolver(() => Users)
export class FindOneUserResolver {
  constructor(private readonly findOneUserService: FindOneUserService) {}

  @UseGuards(GqlAuthGuard, AccessGuard)
  @UseAbility(Actions.Read, Users)
  @Query(() => Users)
  findOneClient(@Args('id', { type: () => ID }) id: string): Promise<Users> {
    return this.findOneUserService.findOne(id);
  }
}
