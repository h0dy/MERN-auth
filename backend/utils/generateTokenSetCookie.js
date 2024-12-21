import jwt from "jsonwebtoken";

export default (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "Production",
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });
  return token;
};
