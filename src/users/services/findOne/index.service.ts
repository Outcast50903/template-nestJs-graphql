import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class FindOneUserService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async findOne(id: string): Promise<Users> {
    return this.userModel.findById(id);
  }
}
