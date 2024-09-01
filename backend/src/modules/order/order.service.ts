import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../../common';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const orders = await this.prismaService.order.findFirst({
      where: {
        userId: userId,
        paymentStatus: {
          equals: 'DEFAULT',
        },
      },
    });

    if (orders) {
      throw new BadRequestException('Order already exists');
    }

    return this.prismaService.order.create({
      data: {
        userId,
        shippingServiceId: createOrderDto.shippingServiceId,
        orderItem: {
          createMany: {
            data: createOrderDto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.order.findMany({
      include: {
        orderItem: {
          include: { product: true },
        },
        user: true,
        shippingService: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItem: {
          include: { product: true },
        },
        user: true,
        shippingService: true,
      },
    });
  }

  findUserCart(userId: number) {
    return this.prismaService.order.findFirst({
      where: {
        userId,
        paymentStatus: {
          equals: 'DEFAULT',
        },
      },
      include: {
        orderItem: {
          include: { product: { include: { category: true } } },
          orderBy: {
            id: 'asc',
          },
        },
        shippingService: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.order.delete({ where: { id } });
  }

  updateOrderStatus(
    orderId: number,
    paymentStatus?: PaymentStatus,
    deliveryStatus?: DeliveryStatus,
  ) {
    return this.prismaService.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        deliveryStatus,
      },
    });
  }

  async addItemToOrder(orderId: number, productId: number, quantity: number) {
    return this.prismaService.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
      },
    });
  }

  async updateOrderItem(orderItemId: number, quantity: number) {
    return this.prismaService.orderItem.update({
      where: { id: orderItemId },
      data: { quantity },
    });
  }

  async removeItemFromOrder(orderItemId: number) {
    return this.prismaService.orderItem.delete({
      where: { id: orderItemId },
    });
  }

  async cancelOrder(orderId: number) {
    return this.updateOrderStatus(
      orderId,
      PaymentStatus.CANCELED,
      DeliveryStatus.CANCELED,
    );
  }

  async findUserOrders(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
      include: {
        orderItem: {
          include: { product: true },
        },
        shippingService: true,
      },
    });
  }

  async getOrderDetails(orderId: number) {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        orderItem: {
          include: { product: true },
        },
        user: true,
        shippingService: true,
      },
    });
  }

  async deleteOrder(orderId: number) {
    return this.prismaService.order.delete({
      where: { id: orderId },
    });
  }

  async checkOrderStatus(orderId: number) {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
      select: {
        paymentStatus: true,
        deliveryStatus: true,
      },
    });
  }

  async updateShippingService(orderId: number, shippingServiceId: number) {
    return this.prismaService.order.update({
      where: { id: orderId },
      data: { shippingServiceId },
    });
  }

  async createOrderWithTransaction(
    userId: number,
    createOrderDto: CreateOrderDto,
  ) {
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          userId,
          shippingServiceId: createOrderDto.shippingServiceId,
          orderItem: {
            createMany: {
              data: createOrderDto.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });

      return order;
    });
  }
}
