import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiTags } from '@nestjs/swagger';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { DeleteManyDto } from './dto/delete-many.dto';

@ApiTags('DiscountRule')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Discount'],
  })
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get all Discount'],
  })
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get Discount'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update Discount'],
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete Discount'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Delete many Discounts'],
  })
  @Delete()
  removeBatch(@Body() body: DeleteManyDto) {
    return this.discountService.removeBatch(body.id);
  }
}
