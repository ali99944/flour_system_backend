import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ExpenseRepository from "../repositories/Expense.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllExpenses = asyncWrapper(
    async (req, res) => {
        const { custom_date } = req.query
        
        const expenses = await ExpenseRepository.getAllExpenses(custom_date)
        return res.status(OK).json(expenses)
    }
)


export const createExpense = asyncWrapper(
    async (req, res) => {
        const { total_amount, notes, reason } = req.body
        console.log(req.body);

        await ValidatorRepository.validateNotNull({
            total_amount,
            reason
        })
        const createdExpense = await ExpenseRepository.createExpense({
            total_amount,
            notes,
            reason
        })
        return res.status(OK).json(createdExpense)
    }
)

export const removeExpense = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const removedExpense = await ExpenseRepository.removeExpense({ id })
        return res.status(OK).json(removedExpense)
    }
)


export const removeAllExpenses = asyncWrapper(
    async (req, res) => {
        const removedExpenses = await ExpenseRepository.removeAllExpenses()
        return res.status(OK).json(removedExpenses)
    }
)