import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.mesa.createMany({
    data: [
      { numero: 1, disponible: true },
      { numero: 2, disponible: false },
      { numero: 3, disponible: true },
      { numero: 4, disponible: false },
      { numero: 5, disponible: true },
      { numero: 6, disponible: true },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
