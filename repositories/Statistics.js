import moment from "moment";
import PrismaClientService from "../utils/prisma_client.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import DateTimeRepository from "./Date.js";

class StatisticsRepository {
    static prisma = PrismaClientService.instance

    static getBoxesData = async (custom_month) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const search_month = custom_month != null ? custom_month : moment().format("MM-YYYY")
                const sales = await this.prisma.sale.findMany({})
                const expenses = await this.prisma.expense.findMany({})

                const incomes = await this.prisma.income.findMany({})
                const total_incomes = incomes.map(income => income.profit).reduce((a, b) => a + b, 0)

                const wanted_sales = sales.filter(sale => moment(sale.created_at, DateTimeRepository.date_format).format("MM-YYYY") === search_month)
                const total_expenses = expenses.map(expense => expense.total_amount).reduce((a, b) => a + b, 0)

                const total_clients = await this.prisma.client.count()

                return resolve({
                    total_sales: wanted_sales.length,
                    total_expenses,
                    total_incomes,
                    total_clients
                })
            }
        )
    )

    static getIncomeChartData = async (custom_month) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const search_month = custom_month != null ? custom_month : moment().format("MM-YYYY")
                const incomes = await this.prisma.income.findMany({})
                const wanted_incomes = incomes.filter(income => moment(income.created_at, DateTimeRepository.date_format).format("MM-YYYY") === search_month)
                return resolve(wanted_incomes.map(income => income.profit))
            }
        )
    )
}

export default StatisticsRepository