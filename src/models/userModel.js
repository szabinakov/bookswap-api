const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Must enter username"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    set: (password) => bcrypt.hashSync(password, 8),
  },
});

usersSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
