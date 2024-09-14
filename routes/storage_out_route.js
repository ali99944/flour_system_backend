import { Router } from "express"
import { getStorageOuts } from "../controllers/storage_out_controller.js"

const router = Router()

router.get('/storage-outs', getStorageOuts)


export default router