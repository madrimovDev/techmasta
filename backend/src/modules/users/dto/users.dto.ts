import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  fullName: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  username: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  password: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  phone?: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  address?: string;
  @ApiProperty()
  @IsString()
  soatoId?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
