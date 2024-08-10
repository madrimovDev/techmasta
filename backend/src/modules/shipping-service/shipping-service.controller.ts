import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShippingServiceService } from './shipping-service.service';
import { CreateShippingServiceDto } from './dto/create-shipping-service.dto';
import { UpdateShippingServiceDto } from './dto/update-shipping-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';

@ApiTags('Shipping-Service')
@Controller('shipping-service')
export class ShippingServiceController {
  constructor(
    private readonly shippingServiceService: ShippingServiceService,
  ) {}

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Create Shipping Service'],
  })
  @Post()
  create(@Body() createShippingServiceDto: CreateShippingServiceDto) {
    return this.shippingServiceService.create(createShippingServiceDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Get All Shipping Service'],
  })
  @Get()
  findAll() {
    return this.shippingServiceService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Get Shipping Service'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingServiceService.findOne(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Update Shipping Service'],
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingServiceDto: UpdateShippingServiceDto,
  ) {
    return this.shippingServiceService.update(+id, updateShippingServiceDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Delete Shipping Service'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingServiceService.remove(+id);
  }
}
