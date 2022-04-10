import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { Login } from 'src/auth/dto/login.input';
import { Users } from 'src/users/entities/user.entity';
import { FindOneUserByEmailService } from 'src/users/services/findByEmail/index.service';

@Injectable()
export class ValidateAppUserService {
  constructor(private readonly userService: FindOneUserByEmailService) {}

  async validateAppUser({ email, password }: Login): Promise<Users | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user)
      throw new HttpException(
        'El usuario ingresado no posee cuenta, porfavor registrese',
        HttpStatus.NOT_FOUND,
      );

    const isValid = compareSync(password, user.password);

    return isValid ? user : null;
  }
}
