import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";

class IncomeRepository {
    static prisma = PrismaClientService.instance

    static getAllIncomes = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const incomes = await IncomeRepository.prisma.income.findMany()
                return resolve(incomes)
            }
        )
    )

    static createIncome = async ({ sale_id, profit }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdIncome = await IncomeRepository.prisma.income.create({
                    data: {
                        sale_id: +sale_id,
                        created_at: DateTimeRepository.getCurrentDate(),
                        profit: +profit
                    }
                })
                return resolve(createdIncome)
            }
        )
    )
}

export default IncomeRepository