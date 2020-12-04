const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.create);
router.get("/:id", userController.getOneById);
router.patch("/:id", userController.updateById);
router.post("/login", userController.login);
module.exports = router;
