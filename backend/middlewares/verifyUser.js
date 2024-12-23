import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const { authToken } = req.cookies;
  try {
    if (authToken) {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      if (!decoded) {
        return res
          .status(401)
          .json({ status: "fail", message: "Unauthorized - invalid token" });
      }
      req.userId = decoded.userId;
      next();
      return;
    }
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  } catch (error) {
    console.error("Error in the verifyUser middleware/function: ", error);
    res
      .status(500)
      .json({ status: "Error", message: "Internal error in the server" });
  }
};
