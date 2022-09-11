import { Router } from "express";
import { createWifi, deleteWifi, getAllWifis, getWifiById } from "../controllers/wifiController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/wifi")
    .post(validateToken, createWifi)
    .get(validateToken, getAllWifis);

router
    .route("/wifi/:id")
    .get(validateToken, getWifiById)
    .delete(validateToken, deleteWifi);

export default router;