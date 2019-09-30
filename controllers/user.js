const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserImage = require("../models/userimages");

module.exports = {
  addUser: async (req, res) => {
    try {
      const existedUser = await User.findOne({
        email: req.body.email
      });

      if (existedUser) {
        res.status(404).send({
          message: "user is already exist"
        });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, async function(err, hash) {
            if (!err) {
              const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
              });

              // const user = await User.create(req.body);
              // const userImage = await UserImage.create({
              //   filename: req.files[0].filename,
              //   path: req.files[0].path
              // });

              // await User.findOneAndUpdate(
              //   { _id: user._id },
              //   { $push: { image: userImage._id } },
              //   { new: true }
              // );

              res.status(200).send({
                message: "user is created",
                newUser
              });
            } else {
              res.send({
                message: "password is invalid"
              });
            }
          });
        });
      }
    } catch (error) {
      console.log(err);
      console.log(error);
    }
  },

  login: async (req, res) => {
    const existedUser = await User.findOne({ email: req.body.email });
    const valid = bcrypt.compareSync(req.body.password, existedUser.password);

    if (valid) {
      const token = await jwt.sign(
        { data: existedUser },
        "itIsSecretBeetweenUs",
        {
          expiresIn: "24h"
        }
      );
      res.send({
        token,
        status: 200,
        message: "login Success"
      });
    } else {
      res.status(404).send({ message: "password is invalid" });
    }
  },

  getAll: (req, res) => {
    User.find()
      .populate("addresses", "address -_id")
      .populate({ path: "blog", populate: { path: "comments" } })

      .then(result => {
        res.send(result);
      })
      .catch(error => console.log(error));
  },
  deleteUserById: (req, res) => {
    User.findOneAndDelete({ _id: req.params._id })
      .then(result => {
        res.send(result);
      })
      .catch(error => console.log(error));
  },
  getUserById: (req, res) => {
    const decoded = jwt.verify(req.headers.token, "itIsSecretBeetweenUs");
    console.log(decoded);

    User.findOne({ _id: decoded.data._id })
      .populate("addresses", "address -_id")
      .populate({ path: "blog", populate: { path: "comments" } })

      .then(result => {
        console.log(result, "findone");

        res.send(result);
      })
      .catch(error => console.log(error));
  },

  updateUserById: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      },
      { new: true }
    )
      .then(result => {
        res.send(result);
      })
      .catch(error => console.log(error));
  },

  uploadImageUser: (req, res) => {
    UserImage.create({
      filename: req.files[0].filename,
      path: req.files[0].path
    })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};
