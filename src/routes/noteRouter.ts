import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById } from "../controllers/noteController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/notes")
    .post(validateToken, createNote)
    .get(validateToken, getAllNotes);

router
    .route("/notes/:id")
    .get(validateToken, getNoteById)
    .delete(validateToken, deleteNote);

export default router;