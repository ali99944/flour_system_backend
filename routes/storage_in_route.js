import { Router } from "express"
import { createStorageIn, getAllStorageIns, getStorageInsByFlourType, updateStorageIn } from "../controllers/storage_in_controller.js"

const router = Router()

router.get('/storage-ins', getAllStorageIns)
router.get('/storage-ins/flour/:id', getStorageInsByFlourType)

router.post('/storage-ins', createStorageIn)
router.put('/storage-ins/:id', updateStorageIn)

export default router