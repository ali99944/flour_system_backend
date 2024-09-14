import { Router } from "express"
import { createClient, createClientPayment, deleteClient, getAllClients, getClientPayments, updateClient } from "../controllers/client_controller.js"
import { getClientSales } from "../controllers/sale_controller.js"

const router = Router()

router.get('/clients', getAllClients)
router.post('/clients', createClient)

router.put('/clients/:id', updateClient)
router.delete('/clients/:id', deleteClient)

router.get('/clients/:id/payments', getClientPayments)

router.post('/clients/:id/payments', createClientPayment)

router.get('/clients/:id/sales', getClientSales)

export default router