const express    = require("express");
const router     = express.Router();
const ctrl       = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { strictLimiter, generalLimiter } = require("../middlewares/rateLimit.middleware");

router.post("/register",        strictLimiter, ctrl.register);   // limit registrations
router.post("/login",           strictLimiter, ctrl.login);      // prevent brute force
router.post("/logout",          authMiddleware, ctrl.logout);
router.get("/profile",          authMiddleware, ctrl.getProfile);
router.patch("/profile",        authMiddleware, ctrl.updateProfile);
router.post("/forgot-password", generalLimiter, ctrl.forgotPassword);
router.post("/reset-password",  generalLimiter, ctrl.resetPassword);
router.post("/send-otp",        strictLimiter, ctrl.sendOtp);
router.post("/verify-otp",      generalLimiter, ctrl.verifyOtp);
router.post("/refresh-token",   generalLimiter, ctrl.refreshToken);

router.options("/login", ctrl.optionsLogin);

module.exports = router;
