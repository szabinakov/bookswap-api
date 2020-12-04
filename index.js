const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./src/routes/userRouter");
app.use(express.json());
require("dotenv").config();

const APP_PORT = process.env.PORT || 3000;
app.listen(APP_PORT, () => {
  console.log(`Now serving your Express app at http://localhost:${APP_PORT}`);
});

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use("/users", userRouter);
