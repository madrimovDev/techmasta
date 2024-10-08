import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  fullName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  password: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  phone?: string;
  @ApiProperty()
  @IsInt()
  @Min(0)
  roleId: number;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  username: string;
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class VerifyUserDto {
  @ApiProperty()
  @Length(6, 6)
  @IsNumberString()
  otp: string;
}
