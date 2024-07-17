import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';

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
  @IsNumberString()
  price: number;
  @ApiProperty({
    description: 'Product category id',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumberString()
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
}
