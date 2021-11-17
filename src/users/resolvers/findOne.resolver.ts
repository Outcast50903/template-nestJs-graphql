import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/guards/graphqlAuth.guard';

import { Users } from '../entities/user.entity';
import { FindOneUserService } from '../services/findOne/index.service';

@Resolver(() => Users)
export class FindOneUserResolver {
  constructor(private readonly findOneUserService: FindOneUserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Users)
  findOneClient(@Args('id', { type: () => ID }) id: string): Promise<Users> {
    return this.findOneUserService.findOne(id);
  }
}
