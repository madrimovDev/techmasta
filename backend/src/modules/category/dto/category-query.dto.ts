import { IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  name?: string;
}
