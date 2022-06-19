import { Field, ID, ObjectType } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export class RefreshToken {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  @prop({ unique: true })
  user: string;

  @Field(() => String)
  @prop()
  is_revoked: boolean;

  @Field(() => Date)
  @prop()
  expires: Date;
}
