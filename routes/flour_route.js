import { Router } from "express"
import { getAllFlours } from "../controllers/flour_controller.js"

const router = Router()

router.get('/flours', getAllFlours)


export default router