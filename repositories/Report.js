import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import logger from "../utils/logger.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";
import ReportHelper from "./ReportHelper.js";

class ReportRepository {
    static prisma = PrismaClientService.instance

    static getReports = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const reports = await this.prisma.report.findMany()
                return resolve(reports)
            }
        )
    )

    static createReport = async ({ month }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                console.log('am here')
                const report_file = await ReportHelper.generateReportFile({
                    expenses: [],
                    sales: [],
                    debts: []
                })
    
                // const createdReport = await this.prisma.report.create({
                //     data: {
                //         report_month: month,
                //         report_file: report_file,
                //         report_name: 'xx',
                //         created_at: DateTimeRepository.getCurrentDate()
                //     }
                // })
                return resolve('xxx')
            }
        )
    )
}

export default ReportRepository