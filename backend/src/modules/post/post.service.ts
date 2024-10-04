import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { rm } from 'fs/promises';
import { ProductService } from '../product/product.service';
import { AddCommentDto } from './dto/add-comment.dto';

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

  async removeProduct(postId: number, productId: number) {
    await this.findOne(postId);
    return this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        products: {
          disconnect: [
            {
              id: productId,
            },
          ],
        },
      },
    });
  }

  async findAll() {
    const posts = await this.prismaService.post.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        tags: true,
        createdAt: true,
        postRating: {
          select: {
            star: true,
            userId: true,
          },
        },
        postComment: {
          select: { userId: true },
        },
      },
    });

    return posts;
  }

  async findPopularPosts(limit?: string) {
    const rawLimit = isNaN(+limit) ? 6 : BigInt(+limit);
    const posts = await this.prismaService.$queryRaw`
    SELECT 
        p.id,
        p.title,
        p.description,
        p.poster,
        p.tags,
        p."createdAt",
        COALESCE(json_agg(json_build_object('star', pr.star, 'userId', pr."userId")) FILTER (WHERE pr.star IS NOT NULL), '[]') AS "postRating"
    FROM 
        "Post" p
    LEFT JOIN 
        "PostRating" pr ON p.id = pr."postId" AND pr.star >= 4
    GROUP BY 
        p.id, p.title, p.description, p.poster, p.tags, p."createdAt"
    LIMIT ${rawLimit};
    `;

    return posts;
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        products: true,
        postRating: {
          select: {
            star: true,
            userId: true,
          },
        },
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
      console.log(e)
      throw new NotFoundException('Post not found');
    }
  }

  async addRating(userId: number, postId: number, star: number) {
    await this.findOne(postId);
    const postStar = await this.prismaService.postRating.create({
      data: {
        userId,
        postId,
        star,
      },
    });
    return postStar;
  }

  async getComments(postId: number) {
    const postComments = await this.prismaService.postComment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });
    return postComments;
  }

  async addComment({
    postId,
    ...data
  }: AddCommentDto & { userId: number; postId: number }) {
    await this.findOne(postId);
    const postComment = await this.prismaService.postComment.create({
      data: {
        postId,
        ...data,
      },
    });
    return postComment;
  }

  async updateComment(commentId: number, comment: string) {
    const isExists = await this.prismaService.postComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!isExists)
      throw new NotFoundException(`Comment ${commentId} not found`);

    const data = await this.prismaService.postComment.update({
      where: {
        id: commentId,
      },
      data: {
        comment,
      },
    });
    return data;
  }

  removeComment(commentId: number) {
    return this.prismaService.postComment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
