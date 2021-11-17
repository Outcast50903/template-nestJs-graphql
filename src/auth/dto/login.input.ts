import { Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class Login {
  @Field()
  email: string;

  @Field()
  password: string;
}
