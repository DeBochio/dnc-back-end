const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  id: {
    type: Number,
    require: true,
  },
  Title: {
    type: String,
    required: true,
  },
  NPages: {
    type: Number,
  },
  ISBN: {
    type: String,
    required: true,
  },
  Publishers: {
    type: String,
  },
});

const Books = mongoose.model("Books", BooksSchema);

module.exports = Books;
