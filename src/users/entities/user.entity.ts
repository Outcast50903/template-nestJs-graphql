import {
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';

import { Roles } from 'src/roles';

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Users role for permissions',
});

@ObjectType()
export class Users {
  @Field(() => ID)
  id!: string;

  _id: string;

  @Field(() => String)
  @prop({ unique: true })
  email: string;

  @HideField()
  @prop()
  password?: string;

  @HideField()
  @prop()
  googleId?: string;

  @Field(() => String)
  @prop()
  firstName?: string;

  @Field(() => String)
  @prop()
  lastName?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deleteAt?: Date;

  @Field(() => Roles)
  @prop({ type: String, enum: Roles, default: Roles.USER_ROLE })
  roles?: Roles[];
}

export type CurrentUser = Omit<Users, '_id' | '__v'>;
