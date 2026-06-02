const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/jwt.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.get("/profile",          authMiddleware, ctrl.getProfile);
router.get("/dashboard",        authMiddleware, ctrl.getDashboard);
router.post("/generate-token",  ctrl.generateToken);
router.post("/verify-token",    ctrl.verifyToken);
router.post("/refresh-token",   ctrl.refreshToken);
router.get("/admin",            authMiddleware, roleMiddleware("admin"), ctrl.adminRoute);
router.get("/user",             authMiddleware, ctrl.userRoute);
router.get("/check-role/admin", authMiddleware, roleMiddleware("admin"), ctrl.checkAdminRole);

// OPTIONS
router.options("/profile", ctrl.optionsProfile);

module.exports = router;
