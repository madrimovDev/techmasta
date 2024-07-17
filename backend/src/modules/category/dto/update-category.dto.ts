import { PartialType } from '@nestjs/mapped-types';
import { PartialType as SwaggerPartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(
  SwaggerPartialType(CreateCategoryDto),
) {}
