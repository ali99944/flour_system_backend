import Auth from "../repositories/Auth.js"
import DateTimeRepository from "../repositories/Date.js"
import PrismaClientService from "../utils/prisma_client.js"

export const seedManager = async () => {
    const prisma = PrismaClientService.instance

    await prisma.manager.deleteMany()
    
    const main_manager = await prisma.manager.create({
        data: {
            name: "احمد طارق",
            username: "ahmed",
            password: await Auth.encryptPassword("ahmed"),
            linked_email: "alitarek99944@gmail.com",
            created_at: DateTimeRepository.getCurrentDate(),
        }
    })
    
    const other_manager = await prisma.manager.create({
        data: {
            name: "طارق محمد",
            username: "tarek",
            password: await Auth.encryptPassword("tarek"),
            linked_email: "alitarek99944@gmail.com",
            created_at: DateTimeRepository.getCurrentDate(),
        }
    })

    console.log("Managers seeded successfully!")
}