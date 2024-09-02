import * as fs from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

const prisma = new PrismaClient();

interface Region {
  id: number;
  title: string;
}

interface District extends Region {
  region_id: number;
}

const regions: Region[] = JSON.parse(
  fs.readFileSync(join(process.cwd(), 'regions', 'regions.json'), {
    encoding: 'utf-8',
  }),
);

const districts: District[] = JSON.parse(
  fs.readFileSync(join(process.cwd(), 'regions', 'districts.json'), {
    encoding: 'utf-8',
  }),
);

async function main() {
  let regionCode = 1;

  for (const region of regions) {
    const soatoCode = regionCode.toString().padStart(2, '0');

    // Tekshiradi, agar region ma'lumot mavjud bo'lmasa, qo'shadi
    const existingRegion = await prisma.soato.findUnique({
      where: { code: soatoCode },
    });

    if (!existingRegion) {
      await prisma.soato.create({
        data: {
          code: soatoCode,
          name: region.title,
          type: 'region',
          parentCode: null,
        },
      });
    }

    const regionDistricts = districts.filter(
      (district) => district.region_id === region.id,
    );

    let districtCode = 1;
    for (const district of regionDistricts) {
      const districtSoatoCode =
        soatoCode + districtCode.toString().padStart(2, '0');

      // Tekshiradi, agar district ma'lumot mavjud bo'lmasa, qo'shadi
      const existingDistrict = await prisma.soato.findUnique({
        where: { code: districtSoatoCode },
      });

      if (!existingDistrict) {
        await prisma.soato.create({
          data: {
            code: districtSoatoCode,
            name: district.title,
            type: 'district',
            parentCode: soatoCode,
          },
        });
      }

      districtCode++;
    }

    regionCode++;
  }
}

main()
  .then(() => {
    console.log("Soato ma'lumotlari qo'shildi");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
