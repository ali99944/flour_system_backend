import { Router } from "express"
import { createSale, getAllSales } from "../controllers/sale_controller.js"

const router = Router()

router.get('/sales', getAllSales)
router.post('/sales', createSale)

export default router