import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  findByPhoneNumber(phone: string) {
    return this.prismaService.user.findUnique({
      where: { phone },
    });
  }

  findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  delete(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
