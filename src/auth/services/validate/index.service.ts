import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { Login } from 'src/auth/dto/login.input';
import { Users } from 'src/users/entities/user.entity';
import { FindOneUserByEmailService } from 'src/users/services/findByEmail/index.service';

@Injectable()
export class ValidateAppUserService {
  constructor(private readonly userService: FindOneUserByEmailService) {}

  async validateAppUser({ email, password }: Login): Promise<Users | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException();

    const valid = await bcryptjs.compare(password, user.password);

    return valid ? user : null;
  }
}
