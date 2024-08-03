import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const seed = async (app: INestApplication) => {
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  let adminRole = await prismaService.role.findUnique({
    where: { name: 'admin' },
  });
  let userRole = await prismaService.role.findUnique({
    where: { name: 'user' },
  });

  if (!adminRole) {
    adminRole = await prismaService.role.create({
      data: { name: 'admin' },
    });
  }
  if (!userRole) {
    userRole = await prismaService.role.create({
      data: { name: 'user' },
    });
  }
  const usersCount = await prismaService.user.count({
    where: { role: { name: 'user' } },
  });
  if (usersCount >= 10) return;
  const users = await prismaService.user.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      fullName: faker.person.fullName(),
      username: faker.person.lastName(),
      password: faker.internet.password(),
      roleId: userRole.id,
    })),
  });

  const adminUserCount = await prismaService.user.count({
    where: { role: { name: 'admin' } },
  });

  if (adminUserCount === 0) {
    const passwordHash = await bcrypt.hash('1234', 10); // Replace '1234' with a secure password

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

  const categoryCount = await prismaService.category.count();
  if (categoryCount) return;

  const categoriesSet = new Set<string>();

  while (categoriesSet.size < 6) {
    categoriesSet.add(faker.commerce.department());
  }

  const categoriesData = Array.from(categoriesSet).map((name) => ({
    name,
    description: faker.commerce.productDescription(),
  }));

  const categories = await prismaService.category.createManyAndReturn({
    data: categoriesData,
  });

  for (const category of categories) {
    const products = await prismaService.product.createManyAndReturn({
      data: Array.from({ length: 10 }).map((_, i) => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        categoryId: category.id,
        productType: i % 2 === 0 ? 'HARDWARE' : 'SOFTWARE',
        poster: faker.image.urlPicsumPhotos(),
        price: faker.number.int({ min: 100_000, max: 1_000_000 }),
      })),
    });

    for (const product of products) {
      await prismaService.productInformation.createMany({
        data: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(
          () => ({
            productId: product.id,
            name: faker.lorem.words(faker.number.int({ min: 1, max: 2 })),
            value: faker.word.words({ count: { min: 1, max: 5 } }),
          }),
        ),
      });

      await prismaService.productImage.createMany({
        data: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(
          () => ({
            productId: product.id,
            url: faker.image.urlPicsumPhotos(),
          }),
        ),
      });
      for (const user of users) {
        await prismaService.productRating.create({
          data: {
            userId: user.id,
            productId: product.id,
            star: faker.number.int({ min: 1, max: 5 }),
          },
        });
      }
      for (const user of users) {
        await prismaService.productComment.create({
          data: {
            userId: user.id,
            productId: product.id,
            comment: faker.lorem.paragraph({ min: 1, max: 3 }),
          },
        });
      }
    }
  }
};
