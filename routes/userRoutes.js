const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");
const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);

router.route("/").get(authController.protect, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
