import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from 'nestjs-typegoose';

import { CurrentUser, Users } from 'src/users/entities/user.entity';

@Injectable()
export class DeleteUsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async delete(id: string, currentUser: CurrentUser): Promise<Users> {
    try {
      return this.userModel.findByIdAndUpdate(
        id,
        { $set: { deletedBy: currentUser.id, updatedAt: new Date() } },
        { new: true },
      );
    } catch {
      throw new ApolloError('Error al eliminar el usuario', null, {
        describe: 'Por favor verifique los datos ingresados',
      });
    }
  }
}
