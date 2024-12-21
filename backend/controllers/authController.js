import User from "../models/User.js";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

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
    console.log(user);
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
    sendWelcomeEmail(email, user.name);
    res
      .status(200)
      .json({
        status: "success",
        message: "Email has been verified successfully",
      });
  } catch (error) {}
};

export const login = async (req, res) => {
  res.send("login route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
