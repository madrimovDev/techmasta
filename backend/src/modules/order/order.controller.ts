import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';
import { ApiTags } from '@nestjs/swagger';
import { UpdateQuantityDto } from './dto/update-quantity-dto';
import { UpdateOrderStatusDto } from './dto/update-order-status-dto';
import { AddItemToOrderDto } from './dto/add-item-to-order-dto';
import { UpdateShippingDto } from './dto/update-shipping-dto';

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
    summary: ['Get All Orders'],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Get User Orders'],
  })
  @Get('get-user-order')
  findUserOrder(@Req() req: Request) {
    return this.orderService.findUserCart(+req.user.id);
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

  @WrapperDecorator({
    isPublic: [Role.Admin],
    summary: ['Update Order Status'],
  })
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(
      +id,
      updateStatusDto.paymentStatus,
      updateStatusDto.deliveryStatus,
    );
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Add Item to Order'],
  })
  @Post(':orderId/item')
  addItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() addItemDto: AddItemToOrderDto,
  ) {
    return this.orderService.addItemToOrder(
      orderId,
      addItemDto.productId,
      addItemDto.quantity,
    );
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Update Order Item Quantity'],
  })
  @Patch('item/:itemId')
  updateItemQuantity(
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateQuantityDto,
  ) {
    return this.orderService.updateOrderItem(+itemId, updateItemDto.quantity);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Remove Item from Order'],
  })
  @Delete('item/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.orderService.removeItemFromOrder(+itemId);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Cancel Order'],
  })
  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Check Order Status'],
  })
  @Get(':id/status')
  checkStatus(@Param('id') id: string) {
    return this.orderService.checkOrderStatus(+id);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Update Shipping Service'],
  })
  @Patch(':id/shipping')
  updateShippingService(
    @Param('id') orderId: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    return this.orderService.updateShippingService(
      +orderId,
      updateShippingDto.shippingServiceId,
    );
  }
}
