const User = require("../models/user");

module.exports = {
  addUser: (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(err);
        console.log(error);
      }
    });
  },

  getAll: (req, res) => {
    User.find()
      .populate("addresses", "address -_id")
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

  updateUserById: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
      },{new:true})
      .then(result => {
        res.send(result);
      })
      .catch(error => console.log(error));
  }
      
}
