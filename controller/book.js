import Book from "../models/book.js";
import Author from "../models/author.js";

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
export const createBook = async (req, res) => {
  try {
    const { title, author, categories } = req.body;

    const existAuthor = await Author.findById(author);
    if (!existAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    const newBook = new Book({
      title,
      author,
      categories,
    });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not create a book", error: error.message });
  }
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
