import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const products = await this.prismaService.product.findMany({
      where: {
        id: { in: createOrderDto.items.map((item) => item.productId) },
      },
      include: {
        discountRule: true,
      },
    });

    if (!products.length) {
      throw new BadRequestException('Products not found');
    }

    return this.prismaService.order.create({
      data: {
        userId,
        shippingServiceId: createOrderDto.shippingServiceId,
        orderItem: {
          createMany: {
            data: products.map((item) => ({
              productId: item.id,
              quantity: 1,
              priceAtTime: item.price,
              discountAtTime: item.discountRule?.discountValue,
              minimumQuantityAtTime: item.discountRule?.minimumQuantity,
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

  async findOne(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItem: {
          include: { product: true },
        },
        user: true,
        shippingService: true,
      },
    });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
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
    await this.findOne(orderId);
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
      include: {
        discountRule: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return this.prismaService.orderItem.create({
      data: {
        productId,
        orderId,
        quantity,
        priceAtTime: product.price,
        discountAtTime: product.discountRule?.discountValue,
        minimumQuantityAtTime: product.discountRule?.minimumQuantity,
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
}
