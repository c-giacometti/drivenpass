import { Router } from "express";
import { createCard, deleteCard, getAllCards, getCardById } from "../controllers/cardController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/cards")
    .post(validateToken, createCard)
    .get(validateToken, getAllCards);

router
    .route("/cards/:id")
    .get(validateToken, getCardById)
    .delete(validateToken, deleteCard);

export default router;