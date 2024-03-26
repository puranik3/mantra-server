import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from '@/products/products.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
