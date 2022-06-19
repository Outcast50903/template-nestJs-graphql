import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import { RefreshToken } from 'src/auth/entities/refresh-token.entity';

import { DecodeRefreshTokenService } from '../decodeRefreshToken/index.service';
import { FindRefreshTokenByIdService } from '../findRefreshToken/index.service';

@Injectable()
export class ResolveRefreshTokenService {
  constructor(
    @InjectModel(RefreshToken)
    private readonly decodeRefreshToken: DecodeRefreshTokenService,
    private readonly findRefreshToken: FindRefreshTokenByIdService,
  ) {}

  async resolveRefreshToken(encoded: string): Promise<RefreshToken> {
    const payload = await this.decodeRefreshToken.decodeRefreshToken(encoded);
    const token = await this.findRefreshToken.findRefreshTokenById(payload.id);

    if (!token) {
      throw new Error('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new Error('Refresh token revoked');
    }

    return token;
  }
}
