import { Injectable } from '@nestjs/common';
import { assoc, omit, pipe, prop } from 'ramda';

import { CurrentUser, User } from 'src/users/entities/user.entity';

@Injectable()
export class CleanUsersService {
  clean(user: User): CurrentUser {
    const omitValues = omit(['_id', '__v', 'googleId']);

    const renameToId = (user: User): User => {
      const id = prop('_id', user);

      return assoc('id', id, user);
    };

    const cleanFunction = pipe(
      JSON.stringify,
      JSON.parse,
      renameToId,
      omitValues,
    );

    return cleanFunction(user);
  }
}
