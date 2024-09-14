import { CREATED, OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ClientRepository from "../repositories/Client.js";
import PaymentRepository from "../repositories/Payment.js";

export const getAllClients = asyncWrapper(
    async (req, res) => {
        const clients = await ClientRepository.getAllClients()
        return res.status(OK).json(clients)
    }
)

export const createClient = asyncWrapper(
    async (req, res) => {
        const { name, address, phone_number, shop_name } = req.body

        const createdClient = await ClientRepository.createClient({
            name,
            address,
            phone_number,
            shop_name
        })
        return res.status(CREATED).json(createdClient)
    }
)

export const updateClient = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const { name, address, phone_number, shop_name } = req.body

        const updatedClient = await ClientRepository.updateClient({
            id,
            name,
            address,
            phone_number,
            shop_name
        })
        return res.status(OK).json(updatedClient)
    }
)

export const deleteClient = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const deletedClient = await ClientRepository.deleteClient({
            id
        })
        return res.status(OK).json(deletedClient)
    }
)

export const getClientPayments = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const payments = await PaymentRepository.getClientPayments({
            client_id: +id
        })
        return res.status(OK).json(payments)
    }
)

export const createClientPayment = asyncWrapper(
    async (req, res) => {
        const { id: client_id } = req.params
        const { amount, note } = req.body
        const createdPayment = await PaymentRepository.createClientPayment({
            amount,
            note,
            client_id
        })
        return res.status(OK).json(createdPayment)
    }
)