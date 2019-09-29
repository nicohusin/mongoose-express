const express = require("express")
const router  = express.Router()
const { tokenValid } = require("../helpers/auth");

const addressController =require("../controllers/blog")

router.post("/", tokenValid, addressController.addBlog)

module.exports = router