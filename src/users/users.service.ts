import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }

  async createCustomer(
    user: Omit<CreateUserDto, 'role'>,
  ): Promise<Omit<User, 'password'>> {
    const data = await this.userModel.create(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data.toJSON();
    return rest;
  }

  async findAll(role?: string): Promise<User[]> {
    let filter = {};

    if (role) {
      filter = { role };
    }
    return this.userModel
      .find(filter)
      .select(['email', 'username', 'role'])
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return;
  }

  async updateCart(email: string, cart: UpdateCartDto) {
    this.userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          cart,
        },
      },
    );
  }
}
