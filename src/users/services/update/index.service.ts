import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApolloError } from 'apollo-server-express';
import { InjectModel } from 'nestjs-typegoose';

import { CurrentUser, User } from 'src/users/entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async update(
    query: string | Record<string, any>,
    updateObj: Record<string, any>,
    options: Record<string, any>,
    currentUser: CurrentUser,
  ): Promise<User> {
    const finalOptions = {
      ...options,
      new: true,
    };

    const finalQuery = typeof query === 'string' ? { _id: query } : query;

    updateObj.$set ||= {};
    updateObj.$set.updatedBy = currentUser.id;

    const updatedEmployee = await this.userModel
      .findOneAndUpdate(finalQuery, updateObj, finalOptions)
      .exec();

    // TODO: missing to save registry of update

    if (!updatedEmployee)
      throw new ApolloError('Error al actualizar el empleado', null, {
        describe: 'Por favor verifique los datos ingresados',
      });

    return updatedEmployee;
  }
}
