import { Injectable } from '@nestjs/common';
import { CreateShippingServiceDto } from './dto/create-shipping-service.dto';
import { UpdateShippingServiceDto } from './dto/update-shipping-service.dto';
import { PrismaService } from '../../common';

@Injectable()
export class ShippingServiceService {
  constructor(private prismaService: PrismaService) {}

  create(createShippingServiceDto: CreateShippingServiceDto) {
    return this.prismaService.shippingService.create({
      data: createShippingServiceDto,
    });
  }

  findAll() {
    return this.prismaService.shippingService.findMany();
  }

  findOne(id: number) {
    return this.prismaService.shippingService.findUnique({
      where: { id },
    });
  }

  update(id: number, updateShippingServiceDto: UpdateShippingServiceDto) {
    return this.prismaService.shippingService.update({
      where: { id },
      data: updateShippingServiceDto,
    });
  }

  remove(id: number) {
    return this.prismaService.shippingService.delete({
      where: { id },
    });
  }
}
