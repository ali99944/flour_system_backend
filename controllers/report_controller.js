import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ReportRepository from "../repositories/Report.js"

export const getAllReports = asyncWrapper(async (req, res) => {
    const reports = await ReportRepository.getReports()
    return res.status(OK).json(reports)
})

export const createReport = asyncWrapper(async (req, res) => {
    const { month } = req.body
    console.log(month);
    

    const createdReport = await ReportRepository.createReport({ month })
    console.log(createdReport);
    
    return res.status(OK).json(createdReport)
})

