import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingServiceDto {
  @ApiProperty()
  @IsString()
  @Length(2, 30)
  name: string;
  @ApiProperty()
  @IsString()
  @Length(2, 30)
  description: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;
  @ApiProperty()
  @IsString()
  @Length(2, 30)
  unit: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  @IsArray()
  @IsString({
    each: true,
  })
  soatoCode: string[];
}
