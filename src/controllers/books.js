import Book from "../models/book.js";
import User from "../models/user.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id).populate("books");

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send(user.books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const book = await Book.findById(book_id);

    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const book = await Book.findByIdAndUpdate(book_id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const book = await Book.findByIdAndDelete(book_id);

    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    res.status(200).send({ message: `Книга "${book.title}" удалена` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const takeBook = async (req, res) => {
  try {
    const { book_id, user_id } = req.params;

    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { books: book_id } },
      { returnDocument: "after", runValidators: true },
    );

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { book_id, user_id } = req.params;

    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).send({ message: "Книга не найдена" });
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      { $pullAll: { books: [{ _id: book_id }] } },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
