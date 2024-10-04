import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRatingDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  star: number;
}
