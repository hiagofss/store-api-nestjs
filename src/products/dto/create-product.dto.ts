import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

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
}
