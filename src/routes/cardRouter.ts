import { Router } from "express";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/cards")
    .post(validateToken)
    .get(validateToken);

router
    .route("/cards/:id")
    .get(validateToken)
    .delete(validateToken);

export default router;