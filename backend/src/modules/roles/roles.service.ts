import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateRoleDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.role.findMany();
  }

  findOne(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prismaService.role.findUnique({
      where: { name: createRoleDto.name },
    });

    if (role) {
      throw new BadRequestException(`Role ${role.name} already exists`);
    }
    return this.prismaService.role.create({
      data: createRoleDto,
    });
  }

  async update(id: number, updateRoleDto: CreateRoleDto) {
    const isNameBusy = await this.prismaService.role.findUnique({
      where: { name: updateRoleDto.name },
    });

    if (isNameBusy) {
      throw new BadRequestException(`Role ${isNameBusy.name} already exists`);
    }

    const isRoleExists = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!isRoleExists) {
      throw new BadRequestException(`Role ${id} not exists`);
    }

    return this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async delete(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
