const User = require("../models/User");
const { errorHandler } = require("../middlewares/errorHandler");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, message: "Signup successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};


exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ role: { $ne: "Admin" } });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};


