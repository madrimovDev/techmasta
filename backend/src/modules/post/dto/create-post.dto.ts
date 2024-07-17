import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the post' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  video: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  poster: any;
}
