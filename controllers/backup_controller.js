import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import BackupRepository from "../repositories/Backup.js";

export const createBackup = asyncWrapper(
    async (req, res) => {
        const createdBackup = await BackupRepository.createBackup()
        return res.status(OK).json(createdBackup)
    }
)


export const restoreBackup = asyncWrapper(
    async (req, res) => {
        const data = req.body
        const restoredBackup = await BackupRepository.restoreBackup({
            backup_data: data
        })
        return res.status(OK).json(restoredBackup)
    }
)