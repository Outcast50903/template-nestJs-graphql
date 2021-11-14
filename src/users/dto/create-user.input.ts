import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  email: string;
  password?: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
}
