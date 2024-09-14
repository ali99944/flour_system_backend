import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StorageOutRepository from "../repositories/StorageOut.js"

export const getStorageOuts = asyncWrapper(
    async (req, res) => {
        const { custom_date } = req.query
        console.log(custom_date);
        const storageOuts = await StorageOutRepository.getAllStorageOuts(custom_date)
        return res.status(OK).json(storageOuts)
    }
)