import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoute from "./routes/authRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
