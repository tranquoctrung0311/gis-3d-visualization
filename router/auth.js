const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

// Đăng ký
router.post("/register", authController.registerUser);

// Đăng nhập
router.post("/login", authController.loginUser);

module.exports = router;
