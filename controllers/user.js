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
  }
  // deleteUserByid :
};
