import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StorageInRepository from "../repositories/StorageIn.js"

export const getAllStorageIns = asyncWrapper(
    async (req, res) => {
        const { custom_date } = req.query
        console.log(custom_date);
        const storageIns = await StorageInRepository.getAllStorageIns(custom_date)
        console.log(storageIns);
        return res.status(OK).json(storageIns)
    }
)

export const getStorageInsByFlourType = asyncWrapper(
    async (req, res) => {
        const { id: flour_id } = req.params
        const storageIns = await StorageInRepository.getStorageInsByFlourType({ flour_id })
        return res.status(OK).json(storageIns)
    }
)


export const createStorageIn = asyncWrapper(
    async (req, res) => {
        const { stock, flour_id, unit_purchase_price } = req.body
        const createdStorageIn = await StorageInRepository.createStorageIn({ stock, flour_id, unit_purchase_price })
        return res.status(OK).json(createdStorageIn)
    }
)

export const updateStorageIn = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const { stock, unit_purchase_price } = req.body
        const updatedStorageIn = await StorageInRepository.updateStorageIn({ id, stock, unit_purchase_price })
        return res.status(OK).json(updatedStorageIn)
    }
)