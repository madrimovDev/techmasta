import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Role } from '../../common/guards';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create category'],
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get all categories'],
  })
  @Get()
  async findAll() {
    const categories = await this.categoryService.findALl();
    return categories;
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get category by id'],
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const category = await this.categoryService.findOneById(+id);
    return category;
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update category'],
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    return category;
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete category'],
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.delete(+id);
    return category;
  }
}
