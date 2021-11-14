import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from './entities/user.entity';
import { CleanUsersService } from './services/clean/index.service';
import { CreateUserService } from './services/create/index.service';
import { FindOneUserByEmailService } from './services/findByEmail/index.service';
import { FindOneUserService } from './services/findOne/index.service';
import { userProviders } from './user.provider';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: { timestamps: true } },
    ]),
  ],
  providers: [...userProviders],
  exports: [
    FindOneUserService,
    CreateUserService,
    CleanUsersService,
    FindOneUserByEmailService,
  ],
})
export class UsersModule {}
