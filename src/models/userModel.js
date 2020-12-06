const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Must enter username"],
    unique: true,
    lowercase: true,
    trim: true, //trim the whitespace
  },
  password: {
    type: String,
    require: true,
    set: (password) => bcrypt.hashSync(password, 10),
  },
});

usersSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
