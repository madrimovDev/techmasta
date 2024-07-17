import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { ProductService } from '../product/product.service';
import { rm } from 'fs/promises';

@Injectable()
export class ProductImageService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductService,
  ) {}

  async create(productId: number, image: string) {
    const product = await this.productService.findOneById(productId);
    if (!product)
      throw new NotFoundException(`Product with id ${productId} not found`);
    return this.prismaService.productImage.create({
      data: {
        productId,
        url: image,
      },
    });
  }

  async getAll(productId: number) {
    const product = await this.productService.findOneById(productId);
    if (!product)
      throw new NotFoundException(`Product with id ${productId} not found`);
    return this.prismaService.productImage.findMany({
      where: {
        productId,
      },
    });
  }

  async delete(imageId: number) {
    const image = await this.prismaService.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image)
      throw new NotFoundException(`image with id ${imageId} not found`);

    await rm(image.url);
    return this.prismaService.productImage.delete({
      where: {
        id: imageId,
      },
    });
  }
}
