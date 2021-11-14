import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcryptjs from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ValidateUserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async validate(createUserInput: CreateUserInput): Promise<User | null> {
    const { email, password } = createUserInput;
    const user = await this.userModel.findOne({ email });

    if (!user) return null;

    if (!password) return null;

    const valid = await bcryptjs.compare(password, password);

    return valid ? user : null;
  }
}
