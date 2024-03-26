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
// import { RolesGuard } from '@/auth/roles.guard';
// import { Roles } from '@/auth/role.decorator';
// import { Role } from '@/auth/role.enum';

import { auth } from '@/auth/role.helper';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post()
  // create(@Body() createCartDto: CreateCartDto) {
  //   return this.cartService.create(createCartDto);
  // }

  // @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  @Get()
  findAll(@Request() request: Request) {
    const { sub: email } = request['user'];

    auth(request, 'customer');

    return this.cartService.findAll(email);
  }

  // @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  @Put()
  update(@Request() request: Request, @Body() updateCartDto: UpdateCartDto) {
    const { sub: email } = request['user'];

    auth(request, 'customer');

    return this.cartService.update(email, updateCartDto);
  }

  // @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  @Delete()
  remove(@Request() request: Request) {
    const { sub: email } = request['user'];

    auth(request, 'customer');

    return this.cartService.remove(email);
  }
}
