import { Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class CreateUserInput {
  @Field()
  id?: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  googleId?: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;
}
