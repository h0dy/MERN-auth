import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  authentication,
} from "../controllers/authController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);

router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").patch(resetPassword);

router.get("/authenticated", verifyUser, authentication);

export default router;
