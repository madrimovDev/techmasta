import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { VerificatedUser } from '@prisma/client';

@Injectable()
export class VerificatedUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async verifyUser(userId: number): Promise<VerificatedUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verificatedUser = await this.prismaService.verificatedUser.create({
      data: {
        userId: user.id,
      },
    });
    return verificatedUser;
  }

  async findOne(id: number): Promise<VerificatedUser> {
    const verifiedUser = await this.prismaService.verificatedUser.findUnique({
      where: { userId: id },
    });

    return verifiedUser;
  }
}
