import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Injectable()
export class ProductInformationService {
  constructor(private readonly prismaService: PrismaService) {}

  create(productId: number, createInformationDro: CreateInformationDto) {
    return this.prismaService.productInformation.create({
      data: { ...createInformationDro, productId },
    });
  }

  getAll(productId: number) {
    return this.prismaService.productInformation.findMany({
      where: {
        productId,
      },
    });
  }

  async update(id: number, updateInformation: UpdateInformationDto) {
    const info = await this.prismaService.productInformation.findUnique({
      where: {
        id,
      },
    });

    if (!info)
      throw new NotFoundException(`Product information ${id} not found`);

    return this.prismaService.productInformation.update({
      where: {
        id,
      },
      data: updateInformation,
    });
  }

  async delete(id: number) {
    const info = await this.prismaService.productInformation.findUnique({
      where: { id },
    });

    if (!info)
      throw new NotFoundException(`Product information ${id} not found`);

    return this.prismaService.productInformation.delete({ where: { id } });
  }
}
