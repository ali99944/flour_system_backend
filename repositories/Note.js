import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";

class NoteRepository {
    static prisma = PrismaClientService.instance;

    /**
     * 
     * @returns {Promise<{
     *    id: number,
     *    title: string,
     *    content: string,
     *    created_at: string
     * }[]>}
     */
    static getAllNotes = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const notes = await NoteRepository.prisma.note.findMany({
                    where: {
                        deleted_at: null
                    }
                })
                return resolve(notes)
            }
        )
    )

    static createNote = async ({ title, content }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const createdNote = await NoteRepository.prisma.note.create({
                    data: {
                        title,
                        content,
                        created_at: DateTimeRepository.getCurrentDate(),
                    }
                })
                return resolve(createdNote)
            }
        )
    )

    static updateNote = async ({ id, title, content }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const updatedNote = await NoteRepository.prisma.note.update({
                    where: {
                        id: +id
                    },
                    data: {
                        title,
                        content
                    }
                })
                return resolve(updatedNote)
            }
        )
    )

    static deleteNote = async ({ id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const deletedNote = await NoteRepository.prisma.note.update({
                    where: {
                        id: +id
                    },
                    data: {
                        deleted_at: DateTimeRepository.getCurrentDate(),
                    }
                })
                return resolve(deletedNote)
            }
        )
    )
}

export default NoteRepository