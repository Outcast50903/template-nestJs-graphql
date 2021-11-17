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

  @prop({ unique: true })
  email: string;

  @HideField()
  @prop()
  password?: string;

  @prop()
  googleId?: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deleteAt?: Date;

  @prop({ type: String, enum: Roles, default: Roles.USER })
  roles?: Roles[];
}

export type CurrentUser = Omit<Users, '_id' | '__v'>;
