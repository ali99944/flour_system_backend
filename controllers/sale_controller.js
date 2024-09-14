import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import SaleRepository from "../repositories/Sale.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllSales = asyncWrapper(
    async (req, res) => {
        const { custom_date } = req.query
        console.log(custom_date);
        const sales = await SaleRepository.getAllSales(custom_date)
        return res.status(OK).json(sales)
    }
)


export const getClientSales = asyncWrapper(
    async (req, res) => {
        const { id: client_id } = req.params
        const sales = await SaleRepository.getClientSales({ client_id })
        return res.status(OK).json(sales)
    }
)

export const createSale = asyncWrapper(
    async (req, res) => {
        const { items, notes, client_id, expense_amount, client_payment_amount } = req.body
        
        console.log(items);
        await ValidatorRepository.validateNotNull({
            items,
            client_id
        })
        const createdSale = await SaleRepository.createSale({
            items,
            notes,
            client_id,
            expense_amount,
            client_payment_amount,
        })
        return res.status(OK).json(createdSale)
    }
)