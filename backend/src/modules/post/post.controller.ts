import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { fileFilter } from './utils/file-filter';
import { Role } from '../../common/guards';
import { UpdatePostDto } from './dto/update-post.dto';
import { AddProductDto } from './dto/add-product-dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Post'],
  })
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ) {
    const video = files.find((file) => file.fieldname === 'video');
    const poster = files.find((file) => file.fieldname === 'poster');

    return this.postService.create(createPostDto, video.path, poster.path);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update Post'],
  })
  @Put(':id')
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const video = files.find((file) => file.fieldname === 'video');
    const poster = files.find((file) => file.fieldname === 'poster');
    return this.postService.update(+id, updatePostDto, video?.path, poster?.path);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Add product to Post'],
  })
  @Post('/product/:id')
  addProductToPost(
    @Param('id') id: string,
    @Body() addProductDto: AddProductDto,
  ) {
    return this.postService.addProductToPost(+id, +addProductDto.productId);
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get All Posts'],
  })
  @Get()
  async getAll() {
    return this.postService.findAll();
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get post by id'],
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete Post'],
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(+id);
  }
}
