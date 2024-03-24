import { Review } from '../entities/product.entity';

export type AddReviewDto = Pick<Review, 'rating' | 'text'>;
