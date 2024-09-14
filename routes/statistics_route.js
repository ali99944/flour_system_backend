import { Router } from "express"
import { getBoxesData, getIncomeChartData } from "../controllers/statistics_controller.js"

const router = Router()

router.get('/statistics/boxes-data', getBoxesData)
router.get('/statistics/chart-data', getIncomeChartData)


export default router