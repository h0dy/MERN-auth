import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";

const app = express();
dotenv.config();
console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.listen(3000, () => {
  connectDb();
  console.log("Server is listening on port 3000");
});
