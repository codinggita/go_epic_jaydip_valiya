const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "name, email and password are required" });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return res.status(400).json({ success: false, message: "Invalid email format" });
    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    const user = await authService.register({ name, email, password });
    res.status(201).json({ success: true, message: "User registered", data: user });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "email and password are required" });
    const result = await authService.login({ email, password });
    res.json({ success: true, message: "Login successful", ...result });
  } catch (err) { next(err); }
};

const logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (err) { next(err); }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    // In production: send reset email. Here we simulate success.
    res.json({ success: true, message: `Password reset link sent to ${email}` });
  } catch (err) { next(err); }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ success: false, message: "token and newPassword are required" });
    // In production: verify token, update password.
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) { next(err); }
};

const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    // In production: send OTP via email/SMS
    res.json({ success: true, message: `OTP sent to ${email}`, otp }); // remove otp in production
  } catch (err) { next(err); }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ success: false, message: "email and otp are required" });
    // In production: verify OTP from DB/cache
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) { next(err); }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: "token is required" });
    const result = await authService.refreshToken(token);
    res.json({ success: true, message: "Token refreshed", ...result });
  } catch (err) { next(err); }
};

const optionsLogin = (req, res) => {
  res.set("Allow", "POST, OPTIONS").json({
    success: true, allowedMethods: ["POST", "OPTIONS"], endpoint: "/auth/login",
  });
};

module.exports = {
  register, login, logout, getProfile, updateProfile,
  forgotPassword, resetPassword, sendOtp, verifyOtp, refreshToken,
  optionsLogin,
};
