import { Router } from "express";
import { createCredential, getAllCredentials, getCredentialById } from "../controllers/credentialController.js";
import validateToken from "../middlewares/tokenMidlleware.js";

const router = Router();

router
    .route("/credentials")
    .post(validateToken, createCredential)
    .get(validateToken, getAllCredentials);

router
    .route("/:id/credentials")
    .get(validateToken, getCredentialById)
    .delete();

export default router;