import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ProductService } from '../product/product.service';

@Module({
  providers: [PostService, ProductService],
  controllers: [PostController],
})
export class PostModule {}
