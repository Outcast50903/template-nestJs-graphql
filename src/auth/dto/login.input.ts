import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType({ isAbstract: true })
export class Login {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
