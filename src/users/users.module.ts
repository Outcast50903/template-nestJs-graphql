import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Users } from './entities/user.entity';
import { UpdateUserResolver } from './resolvers/updateUser.resolver';
import { CleanUsersService } from './services/clean/index.service';
import { CreateUserService } from './services/create/index.service';
import { FindOneUserByEmailService } from './services/findByEmail/index.service';
import { FindOneUserService } from './services/findOne/index.service';
import { UpdateUserService } from './services/update/index.service';
import { userProviders } from './user.provider';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Users, schemaOptions: { timestamps: true } },
    ]),
  ],
  providers: [...userProviders],
  exports: [
    FindOneUserService,
    CreateUserService,
    CleanUsersService,
    FindOneUserByEmailService,
    UpdateUserResolver,
    UpdateUserService,
  ],
})
export class UsersModule {}
