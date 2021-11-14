import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CurrentUser, User } from 'src/users/entities/user.entity';

@Injectable()
export class DeleteUsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async delete(id: string, currentUser: CurrentUser): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { deletedBy: currentUser.id as any } },
      { new: true },
    );
  }
}
