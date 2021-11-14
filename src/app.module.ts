import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppImports } from './configuration';

@Module({
  imports: [UsersModule, AuthModule, ...AppImports],
  controllers: [],
  providers: [],
})
export class AppModule {}
