const express = require("express")
const router  = express.Router()

const addressController =require("../controllers/address")

router.post("/", addressController.addAddress)

module.exports = router