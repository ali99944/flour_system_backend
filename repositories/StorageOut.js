import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";

class StorageOutRepository {
    static prisma = PrismaClientService.instance

    /**
     * 
     * @param {string?} custom_date 
     * @returns 
     */
    static getAllStorageOuts = async (custom_date) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const storageOuts = await StorageOutRepository.prisma.storageOut.findMany({
                    include: {
                        storage_in: {
                            include: {
                                flour: true
                            }
                        },
                        client: true,
                        sale: true,
                        flour: true
                    },
                    where: {
                        created_at: {
                            startsWith: custom_date != null ? custom_date : moment().format("DD-MM-YYYY")
                        }
                    }
                })
                return resolve(storageOuts)
            }
        )
    )
}

export default StorageOutRepository