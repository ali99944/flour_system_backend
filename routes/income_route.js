import { Router } from "express"
import { getAllIncomes } from "../controllers/income_controller.js"

const router = Router()

router.get('/incomes', getAllIncomes)

export default router