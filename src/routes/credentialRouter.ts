import { Router } from "express";
import { createCredential, deleteCredential, getAllCredentials, getCredentialById } from "../controllers/credentialController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/credentials")
    .post(validateToken, createCredential)
    .get(validateToken, getAllCredentials);

router
    .route("/credentials/:id")
    .get(validateToken, getCredentialById)
    .delete(validateToken, deleteCredential);

export default router;