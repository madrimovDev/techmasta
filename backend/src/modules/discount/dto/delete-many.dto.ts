import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class DeleteManyDto {
  @ApiProperty({
    type: 'number',
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  id: number[];
}
