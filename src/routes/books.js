import { Router } from "express";

import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  getUserBooks,
  returnBook,
  takeBook,
  updateBook,
} from "../controllers/books.js";

const router = Router();

router.get("/books", getBooks);
router.get("/books/:book_id", getBook);
router.get("/users/:user_id/books", getUserBooks);
router.post("/books", createBook);
router.patch("/books/:book_id", updateBook);
router.patch("/users/:user_id/books/:book_id/take", takeBook);
router.patch("/users/:user_id/books/:book_id/return", returnBook);
router.delete("/books/:book_id", deleteBook);

export default router;
