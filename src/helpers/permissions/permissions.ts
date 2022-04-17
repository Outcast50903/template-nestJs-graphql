import { Actions, InferSubjects, Permissions } from 'nest-casl';
import { TypegooseClass } from 'nestjs-typegoose/dist/typegoose-class.interface';

import { Roles } from 'src/roles';
import { Users } from 'src/users/entities/user.entity';

export type Subjects = InferSubjects<Users>;

export const permissions = (
  model: TypegooseClass,
): Permissions<Roles, Subjects, Actions> => ({
  everyone({ can }) {
    can(Actions.read, model);
    can(Actions.create, model);
    can(Actions.update, model);
  },
  ADMIN_ROLE({ can }) {
    can(Actions.read, model);
    can(Actions.manage, model);
    can(Actions.delete, model);
    can(Actions.update, model);
  },
  USER_ROLE({ can, cannot }) {
    can(Actions.read, model);
    cannot(Actions.update, model);
    cannot(Actions.delete, model);
  },
});
