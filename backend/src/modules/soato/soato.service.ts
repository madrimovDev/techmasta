import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';

@Injectable()
export class SoatoService {
  constructor(private readonly prismaService: PrismaService) {}

  findAllRegions() {
    return this.prismaService.soato.findMany({
      where: {
        type: 'region',
      },
      include: {
        children: true,
      },
    });
  }

  findAllDistricts(code: string) {
    return this.prismaService.soato.findMany({
      where: {
        type: 'district',
        parentCode: code,
      },
    });
  }
}
