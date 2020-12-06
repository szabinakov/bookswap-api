const Book = require("../models/bookModel");
require("dotenv").config();
const multer = require("multer");
var AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createBook = (req, res) => {
  const userId = req.params.userId;

  //AWS
  const file = req.file;
  const s3FileUrl = process.env.AWS_Uploaded_File_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send({ data });
      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileUrl + file.originalname,
        s3_key: params.Key,
      };
    }
  });
  //aWS
};

exports.getAll = (req, res) => {
  Book.find()
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(400).json(err));
};

exports.findById = (req, res) => {
  const id = req.params.bookId;

  Book.findById(id)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book Not Found" });
      } else {
        res.status(200).json(book);
      }
    })
    .catch((err) => res.send(err));
};

exports.getBooksOfUser = (req, res) => {
  const userId = req.params.userId;
  Book.find({ User: userId })
    .populate("User") //swappes the ObjectId to the User details(embedding the details of user)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book Not Found" });
      } else {
        res.status(200).json(book);
      }
    })
    .catch((err) => res.send(err));
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndUpdate(bookId, req.body, { new: true })
    .then((updated) => res.status(200).json(updated))
    .catch((err) => res.status(400).json(err));
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndDelete(bookId)
    .then((deleted) => res.status(200).json(deleted))
    .catch((err) => res.status(400).json(err));
};
