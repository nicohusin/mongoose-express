const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema = new Schema(
  {
    comment: {type:String, required: true}
  },
  {timestamps: true}
);

const Comment = mongoose.model("comment", addressSchema)

module.exports = Comment;