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
  description: 'User role for permissions',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @prop({ unique: true })
  email: string;

  @HideField()
  @prop({ required: true })
  password?: string;

  @prop({ required: true })
  googleId?: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @prop({ type: String, enum: Roles, default: Roles.USER })
  roles?: Roles[];
}

export type CurrentUser = Omit<User, '_id' | '__v'>;
