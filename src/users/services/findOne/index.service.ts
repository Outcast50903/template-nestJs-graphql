import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FindOneUserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
}
