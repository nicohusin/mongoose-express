const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let userSchema = new Schema(
  {
    name: String,
    password: String,
    email: String,
    phoneNumber: String,
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "address"
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
