import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInformationDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  value: string;
}
