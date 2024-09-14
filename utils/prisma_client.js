import { PrismaClient } from '@prisma/client'

class PrismaClientService {
    static #instance = null

    /**
     * Returns the singleton instance of the PrismaClient.
     *
     * @return {PrismaClient} The singleton instance of the PrismaClient.
     */
    static get instance() {
        if (!PrismaClientService.#instance) {
            PrismaClientService.#instance = new PrismaClient()
        }
        return PrismaClientService.#instance
    }
}


export default PrismaClientService