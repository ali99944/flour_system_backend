import { Router } from "express"
import { loginManager } from "../controllers/manager_controller.js"
const router = Router()

router.post('/managers/login', loginManager)

export default router