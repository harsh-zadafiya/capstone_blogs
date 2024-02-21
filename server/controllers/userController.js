const User = require("../models/userModel");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const cookie = require("../constants/cookies");
const AppError = require("../utils/appError");

exports.sendCookie = (key, value, options, res) => {
  if (!options.maxAge) {
    options.maxAge = process.env.JWT_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  }
  res.cookie(key, value, options);
};

exports.createAndSendToken = async (data, res) => {
  const token = jwt.sign(data, process.env.SESSION_TOKEN, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });

  this.sendCookie(
    cookie.KEY,
    token,
    {
      // httpOnly: true,
    },
    res
  );

  return token;
};

exports.createNewAccount = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  user.password = undefined;

  const token = await this.createAndSendToken(
    {
      email: user.email,
      _id: user._id,
    },
    res
  );

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and Password is requried!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password entered", 401));
  }

  const token = await this.createAndSendToken({ email, _id: user._id }, res);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.forgotpassword = (req, res, next) => {
  const { email, password } = req.body;

  const updatePassword = async () => {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "User is not found",
      });
    }

    const newPassword = await bcrypt.hash(password, 8);

    await User.updateOne(
      { email: findUser.email },
      { $set: { password: newPassword } }
    );
    return res.status(200).json({
      status: true,
      message: "your password is sucessfully updated.",
    });
  };

  updatePassword();
};

exports.validateSession = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  console.log(token);

  const tokenData = await promisify(jwt.verify)(
    token,
    process.env.SESSION_TOKEN
  );

  const user = await User.findById(tokenData._id);

  this.sendCookie(cookie.KEY, token, { httpOnly: true }, res);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.logout = (req, res, next) => {
  res.clearCookie(cookie.KEY);

  res.status(200).json({
    status: "success",
  });
};
