import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType({ isAbstract: true })
export class CreateUserInput {
  @Field()
  id?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password?: string;

  googleId?: string;

  @Field()
  @IsString()
  firstName?: string;

  @Field()
  @IsString()
  lastName?: string;
}
