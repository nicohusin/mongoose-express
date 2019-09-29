const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  addBlog: async (req, res) => {
    const decoded = jwt.verify(req.headers.token, "itIsSecretBeetweenUs");
    // create the address first to generate its `_id`
    const blog = await Blog.create({
      blog: req.body.blog
    });
    console.log(decoded)
    //then pass the `address._id` to user
    const user = await User.findOneAndUpdate(
      { _id: decoded.data._id },
      { $push: { blog: blog._id } },
      { new: true }
    );

    res.status(200).send({
      message: "created new blog success",
      blog,
      user
    });
  }
};