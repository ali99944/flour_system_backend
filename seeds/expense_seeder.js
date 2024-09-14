// seeds/expense_seeder.js

import { fakerAR as faker } from '@faker-js/faker';
import PrismaClientService from '../utils/prisma_client.js';

const prisma = PrismaClientService.instance;

export const seedExpenses = async (count = 10) => {
  await prisma.expense.deleteMany(); // Clear existing data

  for (let i = 0; i < count; i++) {
    await prisma.expense.create({
      data: {
        total_amount: parseFloat(faker.finance.amount()),
        reason: faker.lorem.sentence(),
        notes: faker.lorem.paragraph(),
        created_at: faker.date.past().toISOString(),
        sale_id: null,
      },
    });
  }

  console.log("Expenses seeded successfully!");
};
