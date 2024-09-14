import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import PrismaClientService from '../utils/prisma_client.js'

class FlourRepository {
    static prisma = PrismaClientService.instance

    static getAllFlours = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const flours = this.prisma.flour.findMany()

                return resolve(flours)
            }
        )
    )
}

export default FlourRepository