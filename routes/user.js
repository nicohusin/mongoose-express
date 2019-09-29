const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const upload = require("../config/multer");
const { tokenValid } = require("../helpers/auth");

router.post("/", userController.addUser);
router.get("/", tokenValid, userController.getAll);
router.get("/userdata", tokenValid, userController.getUserById);
router.delete("/:_id", userController.deleteUserById);
router.put("/:id", userController.updateUserById);
router.post("/user-image", upload.any(), userController.uploadImageUser);
router.post("/login", userController.login);

module.exports = router;
