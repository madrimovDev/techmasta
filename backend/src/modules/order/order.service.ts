import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../../common';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  create(userId: number, createOrderDto: CreateOrderDto) {
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
    return this.prismaService.order.findMany({
      where: {
        userId,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.order.delete({ where: { id } });
  }
}
