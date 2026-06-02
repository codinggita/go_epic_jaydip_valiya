const jwt = require("jsonwebtoken");

const getProfile = (req, res) => {
  res.json({ success: true, message: "JWT protected profile", data: req.user });
};

const getDashboard = (req, res) => {
  res.json({
    success: true,
    message: "JWT protected dashboard",
    data: { user: req.user, stats: { problems: 3202, topics: 200 } },
  });
};

const generateToken = (req, res, next) => {
  try {
    const { id, role } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "id is required" });
    const token = jwt.sign(
      { id, role: role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    res.json({ success: true, message: "Token generated", token });
  } catch (err) { next(err); }
};

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: "token is required" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, message: "Token is valid", data: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const refreshToken = (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: "token is required" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    res.json({ success: true, message: "Token refreshed", token: newToken });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const adminRoute = (req, res) => {
  res.json({ success: true, message: "Admin access granted", user: req.user });
};

const userRoute = (req, res) => {
  res.json({ success: true, message: "User access granted", user: req.user });
};

const checkAdminRole = (req, res) => {
  res.json({ success: true, message: "Admin role verified", role: req.user.role });
};

const optionsProfile = (req, res) => {
  res.set("Allow", "GET, OPTIONS").json({
    success: true, allowedMethods: ["GET", "OPTIONS"], endpoint: "/jwt/profile",
  });
};

module.exports = {
  getProfile, getDashboard, generateToken, verifyToken,
  refreshToken, adminRoute, userRoute, checkAdminRole, optionsProfile,
};
