import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import DateTimeRepository from "../repositories/Date.js"
import PaymentRepository from "../repositories/Payment.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllPayments = asyncWrapper(
    async (req, res) => {
        const payments = await PaymentRepository.getAllPayments()
        return res.status(OK).json(payments)
    }
)

export const createPayment = asyncWrapper(
    async (req, res) => {
        const { amount, note, client_id, sale_id } = req.body

        await ValidatorRepository.validateNotNull({
            amount,
            client_id
        })
        const createdPayment = await PaymentRepository.createPayment({
            amount,
            note,
            client_id,
            sale_id,
        })
        return res.status(OK).json(createdPayment)
    }
)