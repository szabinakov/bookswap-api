const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: [true, "Must enter the title"],
  },
  author: {
    type: String,
    require: [true, "Must enter the name of the author"],
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
