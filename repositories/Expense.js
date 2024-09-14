import moment from "moment"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import DateTimeRepository from "./Date.js"

class ExpenseRepository {
    static prisma = PrismaClientService.instance

    static getAllExpenses = async (other_date) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                console.log(other_date != null);
                const expenses = await this.prisma.expense.findMany({
                    where: {
                        deleted_at: null,
                        created_at: {
                            startsWith: other_date != null ? other_date : moment().format("DD-MM-YYYY")
                        }
                    },
                    include: {
                        sale: true
                    }
                })

                console.log(expenses);
                return resolve(expenses)
            }
        )
    )

    static createExpense = async ({ total_amount, notes, reason }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdExpense = await this.prisma.expense.create({
                    data: {
                        total_amount: +total_amount,
                        notes,
                        reason,
                        created_at: DateTimeRepository.getCurrentDate()
                    }
                })
                return resolve(createdExpense)
            }
        )
    )

    static removeExpense = async ({ id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const deletedExpense = await this.prisma.expense.update({
                    where: {
                        id: +id
                    },
                    data: {
                        deleted_at: DateTimeRepository.getCurrentDate()
                    }
                })
                return resolve(deletedExpense)
            }
        )
    )

    static removeAllExpenses = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                await this.prisma.expense.updateMany({
                    data: {
                        deleted_at: DateTimeRepository.getCurrentDate()
                    }
                })
                return resolve("تم حذف جميع المصروفات بنجاح")
            }
        )
    )
}

export default ExpenseRepository