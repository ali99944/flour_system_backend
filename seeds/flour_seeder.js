// seeds/flour_seeder.js

import PrismaClientService from '../utils/prisma_client.js';

const prisma = PrismaClientService.instance

export const seedFlours = async (count = 4) => {
  const flours = [
    { name: "درجة أولي" },
    { name: "درجة ثانية" },
    { name: "درجة ثالثة" },
    { name: "درجة رابعة" },
  ];

  await prisma.flour.deleteMany(); // Clear existing data

  for (let i = 0; i < count; i++) {
    const flour = flours[i % flours.length];
    await prisma.flour.create({ data: flour });
  }

  console.log("Flour types seeded successfully!");
};
