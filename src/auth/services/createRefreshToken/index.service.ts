import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from 'nestjs-typegoose';

import { CreateRefreshToken } from 'src/auth/dto/createRefreshToken.input';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenModel: ReturnModelType<typeof RefreshToken>,
    private readonly jwt: JwtService,
  ) {}

  async createRefreshToken(input: CreateRefreshToken): Promise<string> {
    try {
      const expiration = new Date();

      expiration.setMonth(expiration.getMonth() + input.exp);

      const newRefreshTokenModel = new this.refreshTokenModel({
        is_revoked: false,
        user: input.user.id,
        expires: expiration,
      });

      const refreshToken = await newRefreshTokenModel.save();

      return this.jwt.signAsync(
        {},
        {
          expiresIn: expiration.toDateString(),
          subject: String(input.user.id),
          jwtid: String(refreshToken.id),
        },
      );
    } catch {
      throw new ApolloError('Error al crear el refresh token');
    }
  }
}
