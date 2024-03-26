import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
// import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { AuthGuard } from '@/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post()
  // create(@Body() createCartDto: CreateCartDto) {
  //   return this.cartService.create(createCartDto);
  // }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() request: Request) {
    const { sub: email } = request['user'];
    return this.cartService.findAll(email);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Request() request: Request, @Body() updateCartDto: UpdateCartDto) {
    const { sub: email } = request['user'];
    return this.cartService.update(email, updateCartDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Request() request: Request) {
    const { sub: email } = request['user'];
    return this.cartService.remove(email);
  }
}
