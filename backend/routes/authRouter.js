import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);

router.route("/verify-email").post(verifyEmail);

export default router;
