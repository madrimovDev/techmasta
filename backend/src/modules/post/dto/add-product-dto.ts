import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
  @ApiProperty()
  @IsNumberString()
  productId: number;
}
