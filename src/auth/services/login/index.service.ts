import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Token } from 'src/auth/entities/token.entity';
import { Users } from 'src/users/entities/user.entity';
import { CleanUsersService } from 'src/users/services/clean/index.service';

import { CreateRefreshTokenService } from '../createRefreshToken/index.service';

@Injectable()
export class LoginAuthService {
  constructor(
    private readonly cleanUsersService: CleanUsersService,
    private readonly createRefreshToken: CreateRefreshTokenService,
    private readonly jwt: JwtService,
  ) {}

  async login(user: Users): Promise<Token> {
    const payload = {
      sub: user.id,
      user: this.cleanUsersService.clean(user),
    };

    const refresh = await this.createRefreshToken.createRefreshToken({
      user,
      exp: 2,
    });

    return {
      accessToken: this.jwt.sign(payload),
      refreshToken: refresh,
    };
  }
}
