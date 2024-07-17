import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isBusyCategoryName = await this.prismaService.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (isBusyCategoryName) {
      throw new BadRequestException(
        `Category ${createCategoryDto.name} already exists`,
      );
    }

    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findALl() {
    return this.prismaService.category.findMany();
  }

  async findOneById(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id: id },
    });

    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  async findByName(name: string) {
    const category = await this.prismaService.category.findUnique({
      where: { name },
    });

    if (!category) throw new NotFoundException(`Category ${name} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const isExists = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!isExists) throw new NotFoundException(`Category ${id} not found`);
    const category = await this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return category;
  }

  async delete(id: number) {
    const category = await this.prismaService.category.delete({
      where: { id },
    });
    return category;
  }
}
