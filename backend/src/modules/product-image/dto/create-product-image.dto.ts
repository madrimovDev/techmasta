import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  productId: number;

  @ApiProperty({
    format: 'binary',
    type: 'string',
  })
  @IsOptional()
  image: any;
}
