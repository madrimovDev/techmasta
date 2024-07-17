import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { rm } from 'fs/promises';
import { AddSoftwareDto } from './dto/add-software.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Product'],
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('poster'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, poster.path);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Add Soft to product'],
  })
  @Post(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AddSoftwareDto,
  })
  @UseInterceptors(FileInterceptor('software'))
  async addSoft(
    @Param('id') id: string,
    @UploadedFile() software: Express.Multer.File,
  ) {
    try {
      return this.productService.addSoftwareToProduct(+id, software.path);
    } catch {
      await rm(software.path);
      throw new BadRequestException('Product not found');
    }
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update Product'],
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('poster'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    return this.productService.update(+id, updateProductDto, poster?.path);
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get All ProductsPage'],
  })
  @ApiQuery({
    name: 'category',
    required: false,
  })
  @Get()
  getAll(@Query('category') category?: string) {
    return this.productService.getAll(category);
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get Product by id'],
  })
  @Get(':id')
  getOne(@Param('id') id: string) {
    try {
      return this.productService.findOneById(+id);
    } catch {
      throw new NotFoundException();
    }
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Remove product'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
