import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import FlourRepository from "../repositories/Flour.js";

export const getAllFlours = asyncWrapper(
    async (req, res) => {
        const flours = await FlourRepository.getAllFlours()
        return res.status(OK).json(flours)
    }
)
