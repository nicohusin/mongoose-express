const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let blogSchema = new Schema(
  {
    blog: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment"
      }
    ],

    image: [
      {
        type: Schema.Types.ObjectId,
        ref: "blogImage"
      }
    ]
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
