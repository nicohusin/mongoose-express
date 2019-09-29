const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "address"
      }
    ],
    image: [
      {
        type: Schema.Types.ObjectId,
        ref: "userImage"
      }
    ],
    blog: [
      {
        type: Schema.Types.ObjectId,
        ref: "blog"
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
