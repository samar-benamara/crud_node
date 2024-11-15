import Book from "../models/book.js";

export const fetchBooks = async (req, res) => {
  const books = await Book.find();
  res.status(201).json({ model: books, message: " Success " });
};

export const addBook = async (req, res) => {
  console.log("body", req.body);
  const book = new Book(req.body);
  await book.save();
  res.status(201).json({ model: book, message: " Success " });
};

export const getBookById = async (req, res) => {
  console.log("id", req.params.id);
  const book = await Book.findOne({ _id: req.params.id })
    .populate("author")
    .populate("categories");
  // .exec();
  console.log(book.categories.map((x) => x));
  res.status(201).json({ model: book, message: " Success " });
};

export const updateBook = async (req, res) => {
  const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }); // return after update
  res.status(200).json({ model: book, message: "Success" });
};
export const deleteBook = async (req, res) => {
  console.log("id:", req.params.id);
  const book = await Book.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Success" });
};
