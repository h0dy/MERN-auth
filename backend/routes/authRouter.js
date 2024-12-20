import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = Router();

router.route("/login").get(login);
router.route("/signup").get(signup);
router.route("/logout").get(logout);

export default router;
