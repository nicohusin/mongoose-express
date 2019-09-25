const express = require("express")
const router  = express.Router()

const userController =require("../controllers/user")

router.post("/", userController.addUser)
router.get('/', userController.getAll)

module.exports = router;