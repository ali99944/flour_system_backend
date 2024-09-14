import { NOT_FOUND } from "../constants/status_codes.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import Auth from "./Auth.js";

class ManagerRepository {
    static prisma = PrismaClientService.instance;

    static loginManager = async ({ username, password }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const manager = await ManagerRepository.prisma.manager.findFirst({
                    where: {
                        username
                    }
                })
                if (!manager) {
                    return reject({
                        status: NOT_FOUND,
                        message: `Manager with username ${username} not found.` 
                    })
                }

                const match = await Auth.decryptAndCheckPasswordMatch({
                    normal: password,
                    hashed: manager.password
                })

                if (!match) {
                    return reject({
                        status: 401,
                        message: "Wrong password"
                    })
                }

                const token = await Auth.generateToken({
                    id: manager.id,
                    username: manager.username
                })

                return resolve({
                    token, manager
                })
            }
        )
    )
}

export default ManagerRepository