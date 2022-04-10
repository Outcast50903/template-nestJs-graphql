import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class FindOneUserByEmailService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userModel.findOne({ email });
  }
}
