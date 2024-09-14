import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";

class PaymentRepository {
    static prisma = PrismaClientService.instance

    /**
     * 
     * @returns {Promise<import("@prisma/client").Payment[]>}
     */
    static getAllPayments = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const payments = await PaymentRepository.prisma.payment.findMany({
                    include: {
                        client: true,
                        sale: true
                    }
                })
                return resolve(payments)
            }
        )
    )

    static createPayment = async ({ amount, note, client_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdPayment = await this.prisma.payment.create({
                    data: {
                        amount: +amount,
                        note,
                        client_id: +client_id,
                        paid_at: DateTimeRepository.getCurrentDate()
                    }
                })

                await this.prisma.client.update({
                    where: {
                        id: +client_id
                    },
                    data: {
                        debt_balance: {
                            decrement: amount
                        }
                    }
                })
                
                return resolve(createdPayment)
            }
        )
    )

    static getClientPayments = async ({ client_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const payments = await PaymentRepository.prisma.payment.findMany({
                    where: {
                        client_id: +client_id
                    },
                    include: {
                        sale: true,
                        client_id: false,
                        client: true,
                    }
                })
                return resolve(payments)
            }
        )
    )

    static createClientPayment = async ({ amount, note, client_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdPayment = await PaymentRepository.prisma.payment.create({
                    data: {
                        amount: +amount,
                        note,
                        client_id: +client_id,
                        paid_at: DateTimeRepository.getCurrentDate()
                    }
                })
                return resolve(createdPayment)
            }
        )
    )
}

export default PaymentRepository