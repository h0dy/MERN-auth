import User from "../models/User.js";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPassword,
  sendResetSuccessEmail,
} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !name || !password) {
      throw new Error("You must provide all fields");
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already exist" });
    }
    const verificationToken = generateVerificationToken();
    const user = await User.create({
      email,
      password,
      name,
      verificationToken,
      verificationTokenExpired: Date.now() + 1000 * 60 * 60 * 24,
    });

    generateTokenSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.error("Error in the signup function/controller: ", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  try {
    const user = await User.findOne({
      verificationToken,
      verificationTokenExpired: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid code or expired verification token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpired = undefined;
    await user.save();
    await sendWelcomeEmail(email, user.name);
    res.status(200).json({
      status: "success",
      message: "Email has been verified successfully",
    });
  } catch (error) {
    console.error("Error in the verifyEmail function/controller: ", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        generateTokenSetCookie(res, user._id);
        user.lasLogin = new Date();
        await user.save();
        return res.status(200).json({
          status: "success",
          message: "Logged in successfully",
          user: {
            ...user._doc,
            password: undefined,
          },
        });
      }
    }
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid email or password" });
  } catch (error) {
    console.error("Error in the login function/controller: ", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.sendStatus(204);
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const resetToken = crypto.randomBytes(16).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpire = Date.now() + 1000 * 60 * 60;
      await user.save();
      const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      await sendResetPassword(user.email, resetURL);
      return res.status(200).json({
        status: "success",
        message: "Password reset sent successfully",
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "Invalid email",
    });
  } catch (error) {
    console.error("Error in the login function/controller: ", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });
    if (user) {
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      await user.save();
      await sendResetSuccessEmail(user.email);
      return res
        .status(200)
        .json({ status: "success", message: "password successfully updated" });
    }
    return res
      .status(400)
      .json({ status: "fail", message: "invalid or expired token" });
  } catch (error) {
    console.error("Error in the login function/controller: ", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
