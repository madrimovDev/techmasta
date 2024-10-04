import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({
    where: {
      role: 'admin',
    },
  });

  if (!admin) {
    const hashPass = await bcrypt.hash('1234', 10);
    await prisma.user.create({
      data: {
        role: 'admin',
        fullName: 'Admin Admin',
        username: 'admin',
        password: hashPass,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Admin ma'lumotlari qo'shildi");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
