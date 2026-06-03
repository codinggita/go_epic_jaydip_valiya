const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const User    = require("../models/User.model");

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw { statusCode: 400, message: "Email already registered." };
  const hashed = await bcrypt.hash(password, 10);
  const user   = await User.create({ name, email, password: hashed });
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 401, message: "Invalid email or password." };
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { statusCode: 401, message: "Invalid email or password." };
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const getProfile    = async (id)       => User.findById(id).select("-password");
const updateProfile = async (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("-password");

const refreshToken = async (token) => {
  const decoded  = jwt.verify(token, process.env.JWT_SECRET);
  const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  return { token: newToken };
};

module.exports = { register, login, getProfile, updateProfile, refreshToken };
