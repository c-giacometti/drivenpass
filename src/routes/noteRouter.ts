import { Router } from "express";

const router = Router();

router
    .route("/notes")
    .post()
    .get();

router
    .route("/:id/notes")
    .get()
    .delete();

export default router;