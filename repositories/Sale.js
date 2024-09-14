import moment from "moment"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { getTotalOutPrice } from "../utils/calculator.js"
import PrismaClientService from "../utils/prisma_client.js"
import DateTimeRepository from "./Date.js"
import SaleHelperRepository from "./SaleHelper.js"
import logger from "../utils/logger.js"

class SaleRepository {
    static prisma = PrismaClientService.instance

    static getAllSales = async (other_date) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const sales = await SaleRepository.prisma.sale.findMany({
                    where: {
                        created_at: {
                            startsWith: other_date != null ? other_date : moment().format("DD-MM-YYYY")
                        }
                    },
                    include: {
                        client: true,
                        expense: true,
                        income: {
                            include: {
                                flour: true
                            }
                        },
                        payment: {
                            include: {
                                client: true
                            }
                        },
                        storage_outs: {
                            include: {
                                flour: true,
                                client: true,
                                sale: false,
                                storage_in: {
                                    include: {
                                        flour: true
                                    }
                                }
                            }
                        }
                    }
                })

                return resolve(sales)
            }
        )
    )

    static getClientSales = async ({ client_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const sales = await SaleRepository.prisma.sale.findMany({
                    where: {
                        client_id: +client_id
                    },
                    include: {
                        client: true,
                        expense: true,
                        income: {
                            include: {
                                flour: true
                            }
                        },
                        payment: {
                            include: {
                                client: true
                            }
                        },
                        storage_outs: {
                            include: {
                                flour: true,
                                client: true,
                                sale: false,
                                storage_in: {
                                    include: {
                                        flour: true
                                    }
                                }
                            }
                        }
                    }
                })
                return resolve(sales)
            }
        )
    )

    static createSale = async ({ items, notes, client_id, expense_amount, client_payment_amount }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {

                console.log({ items, notes, client_id, expense_amount, client_payment_amount })

                await SaleHelperRepository.validateFlourSufficiency(items)
                const {storage_outs, total_charge} = await SaleHelperRepository.convertItemsIntoStorageOuts({
                    items,
                    client_id,
                })

                const incomes = await SaleHelperRepository.computeIncomes(storage_outs)

                const client = await SaleRepository.prisma.client.findUnique({
                    where: {
                        id: +client_id
                    }
                })

                const createdSale = await SaleRepository.prisma.sale.create({
                    data: {
                        storage_outs: {
                            create: storage_outs
                        },
                        notes: notes.length > 0 ? notes : null,
                        client_id: +client_id,
                        created_at: DateTimeRepository.getCurrentDate(),
                        total_charge: +total_charge,
                        previous_client_debt: client.debt_balance,
                        new_client_debt: client.debt_balance + total_charge - client_payment_amount,
                        expense: expense_amount != null && expense_amount > 0 ? {
                            create: {
                                total_amount: +expense_amount,
                                reason: "دفع مبلغ مع عملية شراء دقيق لتسديد ديون",
                                created_at: DateTimeRepository.getCurrentDate(),
                            }
                        } : undefined,
                        payment: client_payment_amount != null && client_payment_amount > 0 ? {
                            create: {
                                amount: client_payment_amount,
                                client_id: +client_id,
                                paid_at: DateTimeRepository.getCurrentDate(),
                            }
                        } : undefined,
                        income: {
                            create: incomes
                        }
                    }
                })

                await SaleRepository.prisma.client.update({
                    where: {
                        id: +client_id
                    },
                    data: {
                        debt_balance: {
                            increment: +total_charge - +client_payment_amount
                        }
                    }
                })

                await SaleHelperRepository.computeNewFlourStock(storage_outs)

                return resolve(createdSale)
            }
        )
    )
}

export default SaleRepository