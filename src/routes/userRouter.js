require("dotenv").config();
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
var AWS = require("aws-sdk");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerStorage = multer({
  storage: multer.memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

//create,get a book under the user, using users route (because in idex.js(app.use("/users", userRouter))
router.post("/:userId/books", upload.single("img"), bookController.createBook);
router.get("/:userId/books", bookController.getBooksOfUser);

router.post("/", userController.create);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneById);
router.patch("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);
router.post("/login", userController.login);

module.exports = router;
