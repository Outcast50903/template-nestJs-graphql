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
  @IsEmail()
  password?: string;

  googleId?: string;

  @Field()
  @IsEmail()
  firstName?: string;

  @Field()
  @IsString()
  lastName?: string;
}
