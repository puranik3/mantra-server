import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Review {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  })
  rating: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date: string;

  @Prop({
    required: true,
    minlength: 20,
  })
  text: string;
}

@Schema()
export class Product {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  @Prop(
    raw({
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          // console.log('value = ', value);
          // Check if the value is a number
          return typeof value === 'number';
        },
        message: 'price must be a number.',
      },
    }),
  )
  price: number;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    enum: ["men's clothing", "women's clothing", 'jewelery'],
  })
  category: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop(
    raw({
      // required: true,
      rate: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    }),
  )
  rating: Record<string, number>;

  @Prop({
    type: [Review],
    default: [],
  })
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
