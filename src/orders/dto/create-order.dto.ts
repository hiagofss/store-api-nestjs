import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  quantity: number;
}
export class CreateOrderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemDto)
  orderItems: ItemDto[];
}
