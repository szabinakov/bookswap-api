const User = require("../models/userModel");

exports.create = async (req, res) => {
  const user = await User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
// create user with func, not async func:
// exports.create = (req, res) => {
//   User.create(req.body)
//     .then((res) => res.status(200).json(res))
//     .catch((err) => res.status(400).json(err));
// };

exports.getOneById = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "User Not Found" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.send(err));
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => res.status(200).json(updated))
    .catch((err) => res.status(400).json(err));
};

exports.deleteById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((deleted) => res.status(200).json(deleted))
    .catch((err) => res.status(400).json(err));
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "User Not Found!",
        });
      } else {
        if (user.validatePassword(req.body.password)) {
          res.status(200).json(user);
        } else {
          res.status(401).json({
            message: "The username/password is incorrect!",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};
