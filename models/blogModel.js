const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title cannot be empty"],
    trim: true,
    min: [30, "Blog title must have minimum 30 characters"],
    max: [70, "Blog title must have maximum 70 characters"],
  },
  content: {
    type: String,
    required: [true, "Blog content cannot be empty"],
    min: [
      500,
      "Blog content must have content more than or equal to 500 characters",
    ],
    max: [
      1200,
      "Blog content must have content less than or equal to 1200 characters",
    ],
  },
  slug: String,
  imageCover: {
    type: String,
    required: [true, "A Blog must have a cover image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
