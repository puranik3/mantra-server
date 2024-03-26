import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product } from '@/products/entities/product.entity';
// import { User } from '@/users/entities/user.entity';

import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductsService } from '@/products/products.service';
import { UsersService } from '@/users/users.service';

@Injectable()
export class CartService {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async findAll(email: string) {
    const data = await this.usersService.findOneByEmail(email);

    const cart = data.cart;
    const productIds = cart.map((cartItem) => cartItem.productId);

    const products = await this.productsService.findAllByIds(productIds);

    const returnedCart = data.cart.map((cartItem) => {
      return {
        product: products.find((p) => (p as any)._id === cartItem.productId),
        quantity: cartItem.quantity,
      };
    });

    return returnedCart;
  }

  update(email: string, updateCartDto: UpdateCartDto) {
    console.log(updateCartDto);
    return this.usersService.updateCart(email, updateCartDto);
  }

  remove(email: string) {
    return `This action removes a ${email} cart`;
  }
}
