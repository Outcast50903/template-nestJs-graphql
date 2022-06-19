import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { RefreshToken } from 'src/auth/entities/refresh-token.entity';

@Injectable()
export class FindRefreshTokenByIdService {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenModel: ReturnModelType<typeof RefreshToken>,
  ) {}

  async findRefreshTokenById(id: string): Promise<RefreshToken> {
    return this.refreshTokenModel.findById(id);
  }
}
