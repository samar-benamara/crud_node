import express from "express";
import {
  addBook,
  deleteBook,
  getBookById,
  updateBook,
  fetchBooks,
  createBook,
} from "../controller/book.js";

const router = express.Router();

//routes
router.post("/", addBook);
router.post("/check", createBook);
router.get("/:id", getBookById);
router.get("/", fetchBooks);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
