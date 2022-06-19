import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from 'nestjs-typegoose';

import { RefreshToken } from 'src/auth/entities/refresh-token.entity';

@Injectable()
export class DecodeRefreshTokenService {
  constructor(
    @InjectModel(RefreshToken)
    private readonly jwt: JwtService,
  ) {}

  async decodeRefreshToken(token: string): Promise<RefreshToken> {
    return this.jwt.verifyAsync(token);
  }
}
