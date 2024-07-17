import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto, poster: string) {
    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        price: +createProductDto.price,
        categoryId: +createProductDto.categoryId,
        poster,
      },
    });
  }

  async addSoftwareToProduct(id: number, software: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException(`Product ${id} not found`);
    if (product.productType === 'HARDWARE')
      throw new BadRequestException('Product type not allowed');
    return this.prismaService.product.update({
      where: { id },
      data: {
        url: software,
      },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    poster?: string,
  ) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
        poster,
      },
    });
  }

  async getAll(category?: string) {
    return this.prismaService.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        category: true,
        Post: true,
      },
    });
  }

  async findOneById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
        information: true,
      },
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
