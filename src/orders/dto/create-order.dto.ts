import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsInt()
  quantity: number;

  @IsDecimal()
  saleAmount: number;
}
export class CreateOrderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemDto)
  orderItems: ItemDto[];
}
