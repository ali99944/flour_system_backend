// seeds/seeder.js

import { seedFlours } from './flour_seeder.js';
import { seedClients } from './client_seeder.js';
import { seedExpenses } from './expense_seeder.js';
import { seedNotes } from './note_seeder.js';
import PrismaClientService from '../utils/prisma_client.js';
import { seedManager } from './manager_seeder.js';

const runSeeders = async () => {
  await seedFlours()
  // await seedClients(4)
  // await seedExpenses(8)
  // await seedNotes(8)
  await seedManager()
};

runSeeders()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = PrismaClientService.instance
    await prisma.$disconnect();
  });
