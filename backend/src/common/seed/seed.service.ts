import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma';
import * as bcrypt from 'bcrypt';

export const seed = async (app: INestApplication) => {
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  let adminRole = await prismaService.role.findUnique({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    adminRole = await prismaService.role.create({
      data: { name: 'admin' },
    });
  }

  const adminUserCount = await prismaService.user.count({
    where: { role: { name: 'admin' } },
  });

  if (adminUserCount === 0) {
    const passwordHash = await bcrypt.hash('1234', 10); // Replace 'adminpassword' with a secure password

    await prismaService.user.create({
      data: {
        fullName: 'admin',
        username: 'admin',
        password: passwordHash,
        roleId: adminRole.id,
      },
    });

    console.log('First admin user created');
  }
};
