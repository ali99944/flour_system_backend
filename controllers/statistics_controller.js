import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StatisticsRepository from "../repositories/Statistics.js"

export const getBoxesData = asyncWrapper(
    async (req, res) => {
        const { custom_month } = req.query
        const boxesData = await StatisticsRepository.getBoxesData(custom_month)
        return res.status(OK).json(boxesData)
    }
)


export const getIncomeChartData = asyncWrapper(
    async (req, res) => {
        const { custom_month } = req.query
        const incomeChartData = await StatisticsRepository.getIncomeChartData(custom_month)
        return res.status(OK).json(incomeChartData)
    }
)