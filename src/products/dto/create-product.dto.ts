import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../entities/product.entity';
import { Type } from 'class-transformer';

export class ProductCharacteristicDto {
  id: string;

  @IsNotEmpty()
  name: string;

  product: ProductEntity;
}
export class ProductImageDto {
  id: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  url: string;

  product: ProductEntity;
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  stock: number;

  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDto)
  images: ProductImageDto[];
}
