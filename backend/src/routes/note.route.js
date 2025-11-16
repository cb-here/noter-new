import express from 'express'
import { deleteNote, getNotes, createNote, updateNote } from '../controllers/note.controller.js'

const router = express.Router()

router.get("/", getNotes)
router.post("/", createNote)
router.delete("/:id", deleteNote)
router.put("/:id", updateNote)

export default router