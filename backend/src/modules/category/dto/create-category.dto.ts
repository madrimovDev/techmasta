import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @Length(2, 20)
  name: string;
  @ApiProperty()
  @Length(2, 20)
  description: string;
}
