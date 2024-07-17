import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({ include: { role: true } });
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  findByPhoneNumber(phone: string) {
    return this.prismaService.user.findUnique({
      where: { phone },
      include: { role: true },
    });
  }

  findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
      include: { role: true },
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
      include: { role: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      include: { role: true },
    });
  }

  delete(id: number) {
    return this.prismaService.user.delete({
      where: { id },
      include: { role: true },
    });
  }
}
