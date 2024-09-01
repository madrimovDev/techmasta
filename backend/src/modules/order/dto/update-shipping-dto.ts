import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateShippingDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  shippingServiceId: number;
}
