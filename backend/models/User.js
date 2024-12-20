import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a username!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "A user must have a password!"],
    },
    name: {
      type: String,
      required: true,
    },
    lasLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpired: Date,
    verificationToken: String,
    verificationTokenExpired: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
