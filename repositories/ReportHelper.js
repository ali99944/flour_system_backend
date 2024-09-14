import puppeteer from "puppeteer";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import { compiled_report_template } from "../configs/env_configs.js";
import Randomstring from "randomstring";
import logger from "../utils/logger.js";
import DateTimeRepository from "./Date.js";
import PrismaClientService from "../utils/prisma_client.js";
import moment from "moment";

class ReportHelper {
    static prisma = PrismaClientService.instance;

    static getTemplateData = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                try {
                    const currentMonth = moment().format('YYYY-MM');
                    const startOfMonth = moment(currentMonth).startOf('month').toISOString();
                    const endOfMonth = moment(currentMonth).endOf('month').toISOString();

                    const [
                        flourTypes,
                        storageIns,
                        storageOuts,
                        sales,
                        expenses,
                        clients,
                        payments
                    ] = await Promise.all([
                        ReportHelper.getFlourTypes(),
                        ReportHelper.getStorageIns(startOfMonth, endOfMonth),
                        ReportHelper.getStorageOuts(startOfMonth, endOfMonth),
                        ReportHelper.getSales(startOfMonth, endOfMonth),
                        ReportHelper.getExpenses(startOfMonth, endOfMonth),
                        ReportHelper.getTopClients(startOfMonth, endOfMonth),
                        ReportHelper.getPayments(startOfMonth, endOfMonth)
                    ]);

                    const financialSummary = ReportHelper.calculateFinancialSummary(sales, expenses, payments);
                    const inventorySummary = ReportHelper.calculateInventorySummary(flourTypes, storageIns, storageOuts);
                    const projections = ReportHelper.calculateProjections(sales, storageOuts);

                    const templateData = {
                        reportMonth: moment(currentMonth).format('MMMM'),
                        reportYear: moment(currentMonth).format('YYYY'),
                        flourTypes: inventorySummary,
                        storageIns,
                        storageOuts,
                        topClients: clients,
                        financialSummary,
                        projections,
                        generatedDate: moment().format('YYYY-MM-DD HH:mm:ss')
                    };

                    resolve(templateData);
                } catch (err) {
                    reject(err);
                }
            }
        )
    )

    static getFlourTypes = async () => {
        return ReportHelper.prisma.flour.findMany();
    }

    static getStorageIns = async (startDate, endDate) => {
        return ReportHelper.prisma.storageIn.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                flour: true,
                flour_package: true
            }
        });
    }

    static getStorageOuts = async (startDate, endDate) => {
        return ReportHelper.prisma.storageOut.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                flour: true,
                client: true,
                sale: true
            }
        });
    }

    static getSales = async (startDate, endDate) => {
        return ReportHelper.prisma.sale.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                client: true,
                storage_outs: true,
                payment: true,
                expense: true
            }
        });
    }

    static getExpenses = async (startDate, endDate) => {
        return ReportHelper.prisma.expense.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
    }

    static getTopClients = async (startDate, endDate) => {
        const clients = await ReportHelper.prisma.client.findMany({
            include: {
                sales: {
                    where: {
                        created_at: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                }
            }
        });

        return clients
            .map(client => ({
                ...client,
                totalPurchases: client.sales.length,
                totalSpent: client.sales.reduce((sum, sale) => sum + sale.total_charge, 0)
            }))
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5);
    }

    static getPayments = async (startDate, endDate) => {
        return ReportHelper.prisma.payment.findMany({
            where: {
                paid_at: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
    }

    static calculateFinancialSummary = (sales, expenses, payments) => {
        const totalSalesAmount = sales.reduce((sum, sale) => sum + sale.total_charge, 0);
        const totalPaymentsReceived = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.total_amount, 0);
        const grossProfit = totalSalesAmount - totalExpenses;
        const netProfit = grossProfit - (totalSalesAmount - totalPaymentsReceived);

        return {
            totalSalesAmount,
            totalPaymentsReceived,
            totalExpenses,
            grossProfit,
            netProfit,
            profitMargin: (netProfit / totalSalesAmount) * 100
        };
    }

    static calculateInventorySummary = (flourTypes, storageIns, storageOuts) => {
        return flourTypes.map(flourType => {
            const typeIns = storageIns.filter(si => si.flour_id === flourType.id);
            const typeOuts = storageOuts.filter(so => so.flour_id === flourType.id);
            const totalIn = typeIns.reduce((sum, si) => sum + si.stock, 0);
            const totalOut = typeOuts.reduce((sum, so) => sum + so.quantity, 0);
            const currentStock = flourType.stock;
            const turnoverRate = (totalOut / ((currentStock + totalIn) / 2)) * 100;

            return {
                ...flourType,
                totalIn,
                totalOut,
                currentStock,
                turnoverRate
            };
        });
    }

    static calculateProjections = (sales, storageOuts) => {
        const totalSales = sales.reduce((sum, sale) => sum + sale.total_charge, 0);
        const totalQuantity = storageOuts.reduce((sum, so) => sum + so.quantity, 0);
        const averagePricePerKg = totalSales / totalQuantity;

        const projectedIncrease = 1.1; // 10% increase

        const expectedSales = storageOuts.reduce((acc, so) => {
            const flourType = so.flour.name;
            if (!acc[flourType]) {
                acc[flourType] = 0;
            }
            acc[flourType] += so.quantity * projectedIncrease;
            return acc;
        }, {});

        const expectedRevenue = Object.values(expectedSales).reduce((sum, quantity) => sum + quantity * averagePricePerKg, 0);

        return {
            expectedSales: Object.entries(expectedSales).map(([flourType, amount]) => ({ flourType, amount })),
            expectedRevenue
        };
    }

    static generateReportFile = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                try {
                    const templateData = await ReportHelper.getTemplateData();
                    logger.info('Template data generated successfully');

                    const browser = await puppeteer.launch({
                        headless: 'new',
                    });
                    const page = await browser.newPage();

                    const filledTemplate = compiled_report_template(templateData);
                    logger.info('Template filled successfully');

                    let filename = `Report_${DateTimeRepository.getCurrentMonth()}_${Randomstring.generate(10)}.pdf`;

                    await page.setContent(filledTemplate);
                    await page.pdf({ 
                        path: `./storage/reports/${filename}`, 
                        printBackground: true, 
                        format: 'A3' 
                    });
                    

                    await browser.close();
                    logger.info(`Report generated successfully: ${filename}`);

                    await this.prisma.report.create({
                        data: {
                            report_file: `reports/${filename}`,
                            report_name: filename,
                            report_month: DateTimeRepository.getCurrentMonth(),
                            created_at: DateTimeRepository.getCurrentDate()
                        }
                    })
                    return resolve(filename);
                } catch (err) {
                    logger.error('Error generating report:', err);
                    reject(err);
                }
            }
        )
    )
}

export default ReportHelper;