import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductInformationService } from './product-information.service';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { CreateInformationDto } from './dto/create-information.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInformationDto } from './dto/update-information.dto';

@ApiTags('Product-Information')
@Controller('products-information')
export class ProductInformationController {
  constructor(
    private readonly productInformationService: ProductInformationService,
  ) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Product Information'],
  })
  @Post(':productId')
  create(
    @Param('productId') productId: string,
    @Body() createProductDto: CreateInformationDto,
  ) {
    return this.productInformationService.create(+productId, createProductDto);
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get All Information'],
  })
  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.productInformationService.getAll(+productId);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete Product Information'],
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productInformationService.delete(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update Product Information'],
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInformationDto: UpdateInformationDto,
  ) {
    return this.productInformationService.update(+id, updateInformationDto);
  }
}
