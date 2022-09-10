import { Router } from "express";
import { createUser } from "../controllers/authController.js";

const router = Router();

router.post("/signup", createUser);
router.post("/signin");

export default router;