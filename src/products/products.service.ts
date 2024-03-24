import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, Review } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { AddReviewDto } from './dto/add-review.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    return this.productModel.create(product);
  }

  async findAll(category?: string): Promise<Product[]> {
    let filter = {};

    if (category) {
      filter = { category };
    }
    return this.productModel
      .find(filter)
      .select(['title', 'category', 'price', 'image', 'rating'])
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).select('-reviews').exec();
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product);
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id);
    return;
  }

  async findReviews(id: string): Promise<Review[]> {
    const data = await this.productModel.findById(id).select('reviews').exec();
    return data.reviews;
  }

  async addReview(id: string, review: AddReviewDto, username: string) {
    return this.productModel.findByIdAndUpdate(id, {
      $push: {
        reviews: {
          ...review,
          username,
        },
      },
    });
  }
}
