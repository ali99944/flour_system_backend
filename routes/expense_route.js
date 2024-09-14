import { Router } from "express"
import { createExpense, getAllExpenses, removeAllExpenses, removeExpense } from "../controllers/expense_controller.js"

const router = Router()

router.get('/expenses', getAllExpenses)
router.post('/expenses', createExpense)

router.delete('/expenses', removeAllExpenses)
router.delete('/expenses/:id', removeExpense)

export default router