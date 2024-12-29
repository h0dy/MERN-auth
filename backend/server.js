import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoute from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
