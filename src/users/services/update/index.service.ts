import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from 'nestjs-typegoose';

import { CurrentUser, Users } from 'src/users/entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async update(
    query: string | Record<string, any>,
    updateObj: Record<string, any>,
    options: Record<string, any>,
    currentUser: CurrentUser,
  ): Promise<Users> {
    try {
      const finalOptions = {
        ...options,
        new: true,
      };

      const finalQuery = typeof query === 'string' ? { _id: query } : query;

      updateObj.$set ||= {};
      currentUser && (updateObj.$set.updatedBy = currentUser.id);

      // TODO: missing to save registry of update

      return await this.userModel
        .findOneAndUpdate(finalQuery, updateObj, finalOptions)
        .exec();
    } catch (error) {
      throw new ApolloError('Error al actualizar el empleado', null, {
        describe: 'Por favor verifique los datos ingresados',
      });
    }
  }
}
