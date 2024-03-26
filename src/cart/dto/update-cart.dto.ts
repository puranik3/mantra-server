// import { PartialType } from '@nestjs/swagger';
// import { CreateCartDto } from './create-cart.dto';

// export class UpdateCartDto extends PartialType(CreateCartDto) {}

export class UpdateCartItemDto {
  productId: string;
  quantity: number;
}

export type UpdateCartDto = UpdateCartItemDto[];
