import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

import { Users } from 'src/users/entities/user.entity';

@InputType({ isAbstract: true })
export class CreateRefreshToken {
  @Field()
  user: Users;

  @Field()
  @IsNumber()
  exp: number;
}
