const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title cannot be empty"],
    trim: true,
    maxlength: [70, "Blog title must have a maximum of 70 characters"],
    minlength: [20, "Blog title must have a minimum of 20 characters"],
  },
  content: {
    type: String,
    required: [true, "Blog content cannot be empty"],
    minlength: [100, "Blog content must be at least 100 characters long"],
    maxlength: [
      1200,
      "Blog content must be less than or equal to 1200 characters",
    ],
  },
  slug: String,
  imageCover: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose Blog pre-hooks
blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
