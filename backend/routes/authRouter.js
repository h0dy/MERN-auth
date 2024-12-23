import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);

router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").patch(resetPassword);

export default router;
