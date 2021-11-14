import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';

import { GoogleModule } from './google/google.module';
import { FindUserOrSignUpAuthService } from './services/findUserOrSingUp/index.service';
import { LoginAuthService } from './services/login/index.service';
import { authProviders } from './auth.provider';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', process.env.JWT_SECRET),
        signOptions: {
          expiresIn: 60 * 60 * 24 * 30,
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
    forwardRef(() => GoogleModule),
  ],
  providers: [...authProviders, JwtStrategy],
  exports: [FindUserOrSignUpAuthService, LoginAuthService],
})
export class AuthModule {}
