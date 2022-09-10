import { Router } from "express";

const router = Router();

router
    .route("/credentials")
    .post()
    .get();

router
    .route("/:id/credentials")
    .get()
    .delete();

export default router;