import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { rm } from 'fs/promises';
import { ProductService } from '../product/product.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductService,
  ) {}

  async create(createPostDto: CreatePostDto, video: string, poster: string) {
    const post = await this.prismaService.post.create({
      data: {
        ...createPostDto,
        video,
        poster,
      },
    });
    return post;
  }

  update(
    id: number,
    updatePostDto: UpdatePostDto,
    video?: string,
    poster?: string,
  ) {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
        video,
        poster,
      },
    });
  }

  async addProductToPost(postId: number, productId: number) {
    const post = await this.findOne(postId);
    const product = await this.productService.findOneById(productId);

    if (!product || !post)
      throw new NotFoundException(`Post or Product not found`);

    return this.prismaService.post.update({
      where: { id: postId },
      data: {
        products: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async findAll() {
    const posts = await this.prismaService.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        poster: true,
        createdAt: true,
      },
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async delete(id: number) {
    try {
      const post = await this.prismaService.post.delete({
        where: { id },
      });
      const posterPath = post.poster;
      const videoPath = post.video;
      await rm(posterPath);
      await rm(videoPath);
      return post;
    } catch (e) {
      throw new NotFoundException('Post not found');
    }
  }
}
