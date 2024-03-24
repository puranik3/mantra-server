import { User } from '../../users/entities/user.entity';

export type LoginDto = Pick<User, 'email' | 'password'>;
