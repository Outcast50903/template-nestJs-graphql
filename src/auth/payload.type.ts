import { User } from 'src/users/entities/user.entity';

export type Payload = {
  userId: string;
  user: User;
};
