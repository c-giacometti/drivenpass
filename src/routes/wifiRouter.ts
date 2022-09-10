import { Router } from "express";

const router = Router();

router
    .route("/wifi")
    .post()
    .get();

router
    .route("/:id/wifi")
    .get()
    .delete();

export default router;