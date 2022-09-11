import { Router } from "express";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/wifi")
    .post(validateToken)
    .get(validateToken);

router
    .route("/:id/wifi")
    .get(validateToken)
    .delete(validateToken);

export default router;