const mongoose = require("mongoose");
const Blog = require("./../models/blogModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await Blog.find();

  res.status(200).json({
    status: "success",
    results: allBlogs.length,
    data: {
      allBlogs,
    },
  });
});

exports.getBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.createBlog = catchAsync(async (req, res) => {
  const newBlog = await Blog.create(req.body);
  await newBlog.save();

  res.status(201).json({
    status: "success",
    data: {
      data: newBlog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
  });
});
