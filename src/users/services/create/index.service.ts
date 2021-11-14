import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newEmployee = new this.userModel(createUserInput);

    newEmployee.googleId = null;

    return newEmployee.save();
  }
}
