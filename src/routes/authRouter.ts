import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("aqui")
})
router.post("/signup", createUser);
router.post("/signin", loginUser);

export default router;