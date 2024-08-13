import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
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
    description: 'Product type',
    enum: ProductType,
  })
  @IsEnum(ProductType)
  productType: ProductType;

  @ApiProperty({
    description: 'Product poster',
    format: 'binary',
    type: 'string',
  })
  @IsOptional()
  poster: any;

  @ApiProperty({
    required: false,
    description: 'Discount on the product',
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  discount?: number;

  @ApiProperty({
    required: false,
    description:
      'Discount applicable after purchasing a certain count of products',
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  discountAfterCount?: number;
}
