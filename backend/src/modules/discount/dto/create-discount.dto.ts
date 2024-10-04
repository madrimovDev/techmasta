import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  @Length(2)
  name: string;
  @ApiProperty({
    required: false,
  })
  @IsString()
  @Length(2)
  @IsOptional()
  description?: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  minimumQuantity: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  discountValue: number;
}
