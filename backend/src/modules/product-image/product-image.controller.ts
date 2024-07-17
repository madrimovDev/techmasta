import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductImageService } from './product-image.service';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Product-Image')
@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Product Image'],
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createProductImage: CreateProductImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productImageService.create(
      +createProductImage.productId,
      image.path,
    );
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get All Image by Product id'],
  })
  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.productImageService.getAll(+productId);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete Product Image'],
  })
  @Delete(':imageId')
  delete(@Param('imageId') imageId: string) {
    return this.productImageService.delete(+imageId);
  }
}
