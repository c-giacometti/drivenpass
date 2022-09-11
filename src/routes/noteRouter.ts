import { Router } from "express";
import { createNote } from "../controllers/noteController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/notes")
    .post(validateToken, createNote)
    .get(validateToken);

router
    .route("/notes/:id")
    .get(validateToken)
    .delete(validateToken);

export default router;