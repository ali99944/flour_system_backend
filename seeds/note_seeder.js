// seeds/note_seeder.js

import { fakerAR as faker } from '@faker-js/faker';
import PrismaClientService from '../utils/prisma_client.js';

const prisma = PrismaClientService.instance

export const seedNotes = async (count = 10) => {
  await prisma.note.deleteMany(); // Clear existing data

  for (let i = 0; i < count; i++) {
    await prisma.note.create({
      data: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        created_at: faker.date.past().toISOString(),
        deleted_at: null,
      },
    });
  }

  console.log("Notes seeded successfully!");
};
