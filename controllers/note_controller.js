import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import NoteRepository from "../repositories/Note.js";

export const getAllNotes = asyncWrapper(
    async (req, res) => {
        const notes = await NoteRepository.getAllNotes()
        return res.status(OK).json(notes)
    }
)

export const createNote = asyncWrapper(
    async (req, res) => {
        const { title, content } = req.body
        const createdNote = await NoteRepository.createNote({
            title,
            content
        })
        return res.status(OK).json(createdNote)
    }
)

export const updateNote = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const { title, content } = req.body
        const updatedNote = await NoteRepository.updateNote({
            id,
            title,
            content
        })
        return res.status(OK).json(updatedNote)
    }
)

export const deleteNote = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const deletedNote = await NoteRepository.deleteNote({
            id
        })
        return res.status(OK).json(deletedNote)
    }
)