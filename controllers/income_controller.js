import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import IncomeRepository from "../repositories/Income.js";

export const getAllIncomes = asyncWrapper(
    async (req, res) => {
        const incomes = await IncomeRepository.getAllIncomes()
        return res.status(OK).json(incomes)
    }
)