const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://demaxvc:" +
      process.env.DATABASE +
      "@cluster0.nvagr28.mongodb.net/books"
  )
  .then(() => console.log("Connected to db"));

const Books = require("./models/Books");

app.get("/books", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const books = await Books.findById(req.params.id);
    res.json(books);
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.post("/books/new", async (req, res) => {
  console.log(req.body);
  const book = new Books({
    id: req.body.id,
    Title: req.body.Title,
    NPages: req.body.NPages,
    ISBN: req.body.ISBN,
    Publishers: req.body.Publishers,
  });
  console.log(book);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/books/edit/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    book.id = req.body.id;
    book.Title = req.body.Title;
    book.NPages = req.body.NPages;
    book.ISBN = req.body.ISBN;
    book.Publishers = req.body.Publishers;

    console.log(book);
    book.save();
    res.json(book);
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.delete("/books/delete/:id", async (req, res) => {
  try {
    const result = await Books.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("Server Startednp"));
