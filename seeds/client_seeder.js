// seeds/client_seeder.js

import { fakerAR as faker } from '@faker-js/faker';
import PrismaClientService from '../utils/prisma_client.js';

const prisma = PrismaClientService.instance;

export const seedClients = async (count = 10) => {
  await prisma.client.deleteMany(); // Clear existing data

  for (let i = 0; i < count; i++) {
    await prisma.client.create({
      data: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        shop_name: faker.company.name(),
        debt_balance: +faker.finance.amount(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
        deleted_at: null,
      },
    });
  }

  console.log("Clients seeded successfully!");
};
