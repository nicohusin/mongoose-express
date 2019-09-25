const express = require("express")
const router  = express.Router()

const userController =require("../controllers/user")

router.post("/", userController.addUser)
router.get('/', userController.getAll)
router.delete('/:_id' ,userController.deleteUserById)
router.put('/:id', userController.updateUserById)

module.exports = router;