import { Injectable } from '@nestjs/common';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create/index.service';
import { FindOneUserByEmailService } from 'src/users/services/findByEmail/index.service';

@Injectable()
export class FindUserOrSignUpAuthService {
  constructor(
    private readonly findOneUsersService: FindOneUserByEmailService,
    private readonly createUsersService: CreateUserService,
  ) {}

  async findUserOrSignUp(userInput: CreateUserInput): Promise<Users> {
    const user = await this.findOneUsersService.findOneByEmail(userInput.email);

    if (!user) return await this.createUsersService.create(userInput);

    return user;
  }
}
