import { Router } from "express";

const router = Router();

router
    .route("/cards")
    .post()
    .get();

router
    .route("/:id/cards")
    .get()
    .delete();

export default router;