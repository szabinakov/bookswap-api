const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAll);
router.get("/:bookId", bookController.findById);
router.patch("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);

module.exports = router;
