import User from "../models/User.js";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { sendVerificationEmail } from "../mailtrap/verification.js";

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
export const login = async (req, res) => {
  res.send("login route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
