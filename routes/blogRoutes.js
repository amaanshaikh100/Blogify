const express = require("express");
const blogController = require("./../controller/blogsController");
const router = express.Router();

router.route("/").get(blogController.getAllBlogs);

module.exports = router;
