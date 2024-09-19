const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const { promisify } = require("util");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if the email and password exist
  if (!email || !password)
    return next(new AppError("Please provide email or password!", 400));

  // 2) check if the email and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Email or Password!", 401));

  // 3) send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = "";

  // 1) check if headers contain bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2) if there is no token ask user to logged in
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 3) if token is received verify it
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4) find the user based on decoded token
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;

  next();
});
