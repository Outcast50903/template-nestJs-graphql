import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create/index.service';
import { FindOneUserByEmailService } from 'src/users/services/findByEmail/index.service';

@Injectable()
export class SignUpUserService {
  constructor(
    private readonly userService: CreateUserService,
    private readonly findUser: FindOneUserByEmailService,
  ) {}

  async signUp(createUserInput: CreateUserInput): Promise<Users> {
    const foundClient = await this.findUser.findOneByEmail(
      createUserInput.email,
    );

    if (foundClient) return;

    const password = hashSync(createUserInput.password, 10);

    return this.userService.create({
      ...createUserInput,
      password,
      googleId: null,
    });
  }
}
