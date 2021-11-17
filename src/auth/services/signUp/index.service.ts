import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create/index.service';

@Injectable()
export class SignUpUserService {
  constructor(private readonly userService: CreateUserService) {}

  async signUp(createUserInput: CreateUserInput): Promise<Users> {
    const password = await bcryptjs.hash(createUserInput.password, 20);

    return this.userService.create({
      ...createUserInput,
      password,
      googleId: null,
    });
  }
}
