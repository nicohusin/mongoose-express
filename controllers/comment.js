const Comment = require("../models/comment");
const Blog = require("../models/blog");

module.exports = {
  addComment: async (req, res) => {
    const decoded = jwt.verify(req.headers.token, "itIsSecretBeetweenUs")
    // create the address first to generate its `_id`
    const comment = await Comment.create({
      comment: req.body.comment
    });

    //then pass the `address._id` to user
    const blog = await Blog.findOneAndUpdate(
      { _id: decoded._id },
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(200).send({
      message: "comment is created",
      comment,
      blog
    });
  }
};