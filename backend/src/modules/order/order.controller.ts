import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @WrapperDecorator({
    isPublic: [Role.User],
    summary: ['Create Order'],
  })
  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const user = req.user;
    return this.orderService.create(user.id, createOrderDto);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Get All Order'],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Get Order'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Delete Order'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
