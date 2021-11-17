import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CurrentUser, Users } from 'src/users/entities/user.entity';

@Injectable()
export class DeleteUsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async delete(id: string, currentUser: CurrentUser): Promise<Users> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { deletedBy: currentUser.id as any } },
      { new: true },
    );
  }
}
