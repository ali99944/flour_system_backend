import { Router } from "express"
import { createBackup, restoreBackup } from "../controllers/backup_controller.js"

const router = Router()

router.get('/backup', createBackup)
router.post('/backup/restore', restoreBackup)

export default router