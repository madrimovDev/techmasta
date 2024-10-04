import { Category, PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Generate fake categories
  const fakeCategories = Array.from({ length: 4 }).map(() => {
    const category: Omit<Category, 'id'> = {
      name: faker.commerce.department(),
      description: faker.commerce.department(),
    };
    return category;
  });

  // Create categories in the database
  const categories = await Promise.all(
    fakeCategories.map(async (category) => {
      const isExists = await prisma.category.findUnique({
        where: { name: category.name },
      });
      if (isExists) return;
      return prisma.category.create({
        data: category,
      });
    }),
  );

  // Get category IDs for assigning to products
  const categoryIds = categories.map((category) => category.id);

  // Generate fake products
  const fakeProducts = Array.from({ length: 10 }).map(() => {
    const product: Omit<
      Product,
      'id' | 'categoryId' | 'discountRuleId' | 'createdAt' | 'updatedAt'
    > = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 50_000, max: 1_000_000 }),
      poster: faker.image.urlPicsumPhotos(),
      productType: 'HARDWARE',
    };
    return product;
  });

  // Create products in the database and assign each to a random category
  await Promise.all(
    fakeProducts.map(async (product) => {
      const randomCategoryId = faker.helpers.arrayElement(categoryIds); // Pick a random categoryId
      return prisma.product.create({
        data: {
          ...product,
          category: { connect: { id: randomCategoryId } }, // Assign the random categoryId
        },
      });
    }),
  );
}

main()
  .then(() => {
    console.log('Categories and products added successfully.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
