import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import fs from 'fs'

class BackupRepository {
    static prisma = PrismaClientService.instance

    static createBackup = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const clients = await this.prisma.client.findMany()
                const payments = await this.prisma.payment.findMany()
                const notes = await this.prisma.note.findMany()
                const expenses = await this.prisma.expense.findMany()
                const sales = await this.prisma.sale.findMany()
                const storage_outs = await this.prisma.storageOut.findMany()
                const storage_ins = await this.prisma.storageIn.findMany()
                const flour_packages = await this.prisma.flourPackage.findMany()
                const flours = await this.prisma.flour.findMany()
                const incomes = await this.prisma.income.findMany()
                const managers = await this.prisma.manager.findMany()
                const backupData = {
                    clients,
                    payments,
                    notes,
                    expenses,
                    sales,
                    storage_outs,
                    storage_ins,
                    flour_packages,
                    flours,
                    incomes,
                    managers
                }

                

                const jsonData = JSON.stringify(backupData, null, 2);
                
                fs.writeFile('backups/backup.json',jsonData, 'utf8', (err) => {
                    
                });
                console.log('Backup completed successfully.');
                return resolve(jsonData)
            }
        )
    )

    static restoreBackup = async ({ backup_data }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                await this.prisma.$transaction(async (tx) => {
                    await tx.client.deleteMany()
                    await tx.payment.deleteMany()
                    await tx.note.deleteMany()
                    await tx.expense.deleteMany()
                    await tx.sale.deleteMany()
                    await tx.storageOut.deleteMany()
                    await tx.storageIn.deleteMany()
                    await tx.flourPackage.deleteMany()
                    await tx.flour.deleteMany()
                    await tx.income.deleteMany()
                    await tx.manager.deleteMany()
                })

                const clients = await this.prisma.client.createMany({
                    data: backup_data.clients
                })

                const notes = await this.prisma.note.createMany({
                    data: backup_data.notes
                })

                const managers = await this.prisma.manager.createMany({
                    data: backup_data.managers
                })

                const flours = await this.prisma.flour.createMany({
                    data: backup_data.flours
                })

                const storage_ins = await this.prisma.storageIn.createMany({
                    data: backup_data.storage_ins
                })

                const flour_packages = await this.prisma.flourPackage.createMany({
                    data: backup_data.flour_packages
                })

                const sales = await this.prisma.sale.createMany({
                    data: backup_data.sales
                })

                const incomes = await this.prisma.income.createMany({
                    data: backup_data.incomes
                })

                const storage_outs = await this.prisma.storageOut.createMany({
                    data: backup_data.storage_outs
                })

                const expenses = await this.prisma.expense.createMany({
                    data: backup_data.expenses
                })
                
                const payments = await this.prisma.payment.createMany({
                    data: backup_data.payments
                })

                return resolve({
                    clients,
                    payments,
                    notes,
                    expenses,
                    sales,
                    storage_outs,
                    storage_ins,
                    flour_packages,
                    flours,
                    incomes,
                    managers
                })
            }
        )
    )
}

export default BackupRepository