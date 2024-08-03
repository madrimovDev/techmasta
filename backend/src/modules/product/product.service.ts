import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  private async findProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async create(createProductDto: CreateProductDto, poster: string) {
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
    const product = await this.findProductById(id);

    if (product.productType === 'HARDWARE') {
      throw new BadRequestException('Product type not allowed');
    }

    return this.prismaService.product.update({
      where: { id },
      data: { url: software },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    poster?: string,
  ) {
    await this.findProductById(id);

    return this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        poster,
      },
    });
  }

  async getAll(category?: string) {
    const where = category ? { category: { name: category } } : {};

    return this.prismaService.product.findMany({
      where,
      include: {
        category: true,
        Post: true,
        productRating: true,
        productComment: true,
      },
      orderBy: {
        createdAt: 'desc',
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
    await this.findProductById(id);

    return this.prismaService.product.delete({
      where: { id },
    });
  }

  async addRating(productId: number, userId: number, star: number) {
    await this.findProductById(productId);

    return this.prismaService.productRating.create({
      data: {
        productId,
        userId,
        star,
      },
    });
  }

  async getAllComment(productId: number) {
    return this.prismaService.productComment.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: {
          select: {
            fullName: true,
            id: true,
          },
        },
      },
    });
  }

  async addComment({
    productId,
    userId,
    ...data
  }: AddCommentDto & { userId: number; productId: number }) {
    await this.findProductById(productId);

    return this.prismaService.productComment.create({
      data: {
        productId,
        userId,
        ...data,
      },
    });
  }

  async updateComment(commentId: number, comment: string) {
    const existingComment = await this.prismaService.productComment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment)
      throw new NotFoundException(`Comment ${commentId} not found`);

    return this.prismaService.productComment.update({
      where: { id: commentId },
      data: { comment },
    });
  }

  async removeComment(id: number) {
    const existingComment = await this.prismaService.productComment.findUnique({
      where: { id },
    });

    if (!existingComment)
      throw new NotFoundException(`Comment ${id} not found`);

    return this.prismaService.productComment.delete({
      where: { id },
    });
  }
}
