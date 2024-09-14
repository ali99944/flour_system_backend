import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ManagerRepository from "../repositories/Manager.js";
import ValidatorRepository from "../repositories/Validator.js";

export const loginManager = asyncWrapper(
    async (req, res) => {
        const { username, password } = req.body
        console.log(username, password);

        await ValidatorRepository.validateNotNull({ username, password })

        const response = await ManagerRepository.loginManager({ username, password })

        return res.status(OK).json(response)
    }
)