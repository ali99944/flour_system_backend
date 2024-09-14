import { Router } from "express"
import { createPayment, getAllPayments } from "../controllers/payment_controller.js"

const router = Router()

router.get('/payments', getAllPayments)

router.post('/payments', createPayment)

export default router