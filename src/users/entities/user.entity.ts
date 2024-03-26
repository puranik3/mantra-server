import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class CartItem {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  productId: string;

  @Prop({
    type: Number,
    default: 1,
  })
  quantity: number;
}

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: 'customer',
    enum: ['customer', 'admin'],
  })
  role: string;

  @Prop({
    type: [CartItem],
    default: [],
  })
  cart: CartItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
