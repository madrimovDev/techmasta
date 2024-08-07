import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductQueryDto {
  @IsOptional()
  @IsString()
  @Transform((params) => {
    return params.value.toLowerCase();
  })
  category?: string;
  @IsOptional()
  @IsNumberString()
  rating?: string;
  @IsOptional()
  @IsNumberString()
  price?: string;
}
