import { Router } from "express"
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/note_controller.js"

const router = Router()

router.get('/notes', getAllNotes)
router.post('/notes', createNote)
router.delete('/notes/:id', deleteNote)
router.put('/notes/:id', updateNote)

export default router