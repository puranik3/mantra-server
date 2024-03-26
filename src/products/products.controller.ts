import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Request,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  AppHttpException,
  KnownAppHttpExceptionName,
} from '@/exceptions/app-http-exception';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddReviewDto } from './dto/add-review.dto';
// import { AppHttpExceptionFilter } from '@/exceptions/app-http-exception.filter';

import { AuthGuard } from '@/auth/auth.guard';
import { auth } from '@/auth/role.helper';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  // @UseFilters(new AppHttpExceptionFilter())
  async create(@Body() product: CreateProductDto, @Request() request: Request) {
    auth(request, 'admin');

    try {
      const model = await this.productsService.create(product);
      return model;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        message: error.message,
        error,
      });
    }
  }

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.productsService.findAll(query.category, query.page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.productsService.findOne(id);

      if (!data) {
        throw new AppHttpException({
          name: KnownAppHttpExceptionName.NotFound,
        });
      }

      return data;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        message: error.message,
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
    @Request() request: Request,
  ) {
    try {
      auth(request, 'admin');

      const data = await this.productsService.update(id, product);

      if (!data) {
        throw new AppHttpException({
          name: KnownAppHttpExceptionName.NotFound,
        });
      }

      return data;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Request() request: Request) {
    auth(request, 'admin');

    try {
      const data = await this.productsService.remove(id);

      // if (!data) {
      //   throw new AppHttpException({
      //     name: KnownAppHttpExceptionName.NotFound,
      //   });
      // }

      return data;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        error,
      });
    }
  }

  @Get(':id/reviews')
  async findReviews(@Param('id') id: string) {
    try {
      const data = await this.productsService.findReviews(id);

      if (!data) {
        throw new AppHttpException({
          name: KnownAppHttpExceptionName.NotFound,
        });
      }

      return data;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        message: error.message,
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id/reviews')
  async addReview(
    @Param('id') id: string,
    @Body() review: AddReviewDto,
    @Request() request: Request,
  ) {
    try {
      auth(request, 'customer');

      const { username } = request['user'];
      const data = await this.productsService.addReview(id, review, username);

      if (!data) {
        throw new AppHttpException({
          name: KnownAppHttpExceptionName.NotFound,
        });
      }

      return;
    } catch (error) {
      throw new AppHttpException({
        name: error.name,
        error,
      });
    }
  }
}
