import { Injectable } from '@nestjs/common';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserService } from 'src/users/services/create/index.service';
import { FindOneUserByEmailService } from 'src/users/services/findByEmail/index.service';
import { UpdateUserService } from 'src/users/services/update/index.service';

@Injectable()
export class FindUserOrSignUpAuthService {
  constructor(
    private readonly findOneUsersService: FindOneUserByEmailService,
    private readonly updateUserSerice: UpdateUserService,
    private readonly createUserSerice: CreateUserService,
  ) {}

  async findUserOrSignUp(userInput: CreateUserInput): Promise<Users> {
    const user = await this.findOneUsersService.findOneByEmail(userInput.email);

    if (!user) return await this.createUserSerice.create(userInput);

    if (user)
      return await this.updateUserSerice.update(
        user.id,
        {
          $set: { googleId: userInput.googleId },
        },
        {},
        null,
      );
  }
}
