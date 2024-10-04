import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from '../../common';

@Injectable()
export class DiscountService {
  constructor(private prismaService: PrismaService) {}

  create(createDiscountDto: CreateDiscountDto) {
    return this.prismaService.discountRule.create({
      data: createDiscountDto,
    });
  }

  findAll() {
    return this.prismaService.discountRule.findMany({
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prismaService.discountRule.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.prismaService.discountRule.update({
      where: { id },
      data: updateDiscountDto,
    });
  }

  remove(id: number) {
    return this.prismaService.discountRule.delete({ where: { id } });
  }

  removeBatch(id: number[]) {
    return this.prismaService.discountRule.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
  }
}
