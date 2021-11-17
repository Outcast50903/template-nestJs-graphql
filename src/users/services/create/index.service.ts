import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: ReturnModelType<typeof Users>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<Users> {
    console.log(createUserInput);

    const newClient = new this.userModel(createUserInput);

    newClient.googleId ??= null;

    console.log(newClient);

    return newClient.save();
  }
}
