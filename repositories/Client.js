import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";

class ClientRepository {
    static prisma = PrismaClientService.instance;

    static getAllClients = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const clients = await ClientRepository.prisma.client.findMany({
                    where: {
                        deleted_at: null
                    },
                })
                return resolve(clients)
            }
        )
    )

    static createClient = async ({ name, address, phone_number, shop_name }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdClient = await ClientRepository.prisma.client.create({
                    data: {
                        name,
                        address,
                        phone_number,
                        shop_name,

                        created_at: DateTimeRepository.getCurrentDate(),
                    }
                })
                return resolve(createdClient)
            }
        )
    )

    static updateClient = async ({ id, name, address, phone_number, shop_name }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const updatedClient = await ClientRepository.prisma.client.update({
                    where: {
                        id: +id
                    },
                    data: {
                        name,
                        address,
                        phone_number,
                        shop_name
                    }
                })
                return resolve(updatedClient)
            }
        )
    )

    static deleteClient = async ({ id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const deletedClient = await ClientRepository.prisma.client.update({
                    where: {
                        id: +id
                    },
                    data: {
                        deleted_at: DateTimeRepository.getCurrentDate()
                    }
                })
                return resolve(deletedClient)
            }
        )
    )

    static restoreClient = async ({ id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const restoredClient = await ClientRepository.prisma.client.update({
                    where: {
                        id: +id
                    },
                    data: {
                        deleted_at: null
                    }
                })
                return resolve(restoredClient)
            }
        )
    )
}

export default ClientRepository;
