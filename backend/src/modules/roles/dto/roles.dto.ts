import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    examples: ['admin', 'user'],
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
