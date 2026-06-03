const rateLimit = require("express-rate-limit");

// General limiter — all public GET routes
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 100,                  // 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again after 1 minute." },
});

// Strict limiter — POST /auth/login, POST /auth/register (brute force protection)
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                   // 10 attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again after 15 minutes." },
});

// Search limiter — /search/* routes
const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Search rate limit exceeded. Slow down!" },
});

// Delete limiter — DELETE routes
const deleteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Delete rate limit exceeded." },
});

// Upload limiter — bulk import routes
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,                    // 5 bulk uploads per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Bulk upload limit exceeded. Try again in 1 hour." },
});

// Admin limiter — strict admin dashboard
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Admin rate limit exceeded." },
});

module.exports = { generalLimiter, strictLimiter, searchLimiter, deleteLimiter, uploadLimiter, adminLimiter };
