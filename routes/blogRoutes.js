const express = require("express");
const blogController = require("./../controller/blogsController");
const authController = require("./../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
