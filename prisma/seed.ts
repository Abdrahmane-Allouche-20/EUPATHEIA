
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting seed...');
  
  await prisma.user.createMany({
    data: [
      { name: 'sonia', email: 'sonia@exemple.com', },
      { name: 'abderrahmane', email: 'abderrahmane@exemple.com', },
    ]
  });

  console.log('✅ Users created successfully!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🎉 Seed completed!');
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });