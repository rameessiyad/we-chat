const generateToken = require("../config/generate-token");
const User = require("../models/user-model");
const asyncHandler = require("express-async-handler");

module.exports = {
  // @desc Register a user
  // @route POST /api/users
  // @access Public
  registerUser: asyncHandler(async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password)
      return next({ status: 400, message: "Please add all fields" });

    const userExists = await User.findOne({ email });

    if (userExists)
      return next({ status: 400, message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  }),

  // @desc Login a user
  // @route POST /api/users/login
  // @access Public
  loginUser: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return next({ status: 401, message: "Invalid email or password" });
    }
  }),

  // @desc get all users
  // @route GET /api/user?search=ramees
  // @access Public
  getAllUsers: asyncHandler(async (req, res, next) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.send(users);
  }),
};
