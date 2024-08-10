import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsPositive } from 'class-validator';

class OrderItem {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  productId: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  shippingServiceId: number;
  @ApiProperty({
    type: OrderItem,
  })
  @IsArray()
  items: OrderItem[];
}
