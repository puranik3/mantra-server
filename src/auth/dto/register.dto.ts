import { User } from '../../users/entities/user.entity';

export type RegisterDto = Omit<User, 'role'>;
