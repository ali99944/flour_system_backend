import { Router } from "express"
import { createReport, getAllReports } from "../controllers/report_controller.js"

const router = Router()

router.get('/reports', getAllReports)
router.post('/reports', createReport)

export default router