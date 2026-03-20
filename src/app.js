import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { loggerOne } from "./middleware/loggerOne.js";

import booksRouter from "./routes/books.js";
import userRouter from "./routes/users.js";

const PORT = process.env.PORT || 3003;
const API_URL = process.env.API_URL || "http://localhost";
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerOne);

app.use(userRouter);
app.use(booksRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB подключена успешно");
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err.message);
  });
