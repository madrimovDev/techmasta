import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
  })
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Product description',
  })
  @IsNotEmpty()
  @Length(3, 255)
  description: string;

  @ApiProperty({
    description: 'Product price',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty({
    description: 'Product category id',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number;

  @ApiProperty({
    description: 'Product poster',
    format: 'binary',
    type: 'string',
  })
  @IsOptional()
  poster: any;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  discountRuleId: number;
}
