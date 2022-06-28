const express = require("express");
const router = express.Router();
const path = require("path");
const register = require("./register");
const login = require("./login");
const auth = require("./auth");
const logout = require("./logout");
const update = require("./update");
const forgotPassword = require("./forgotPassword");
const reset = require("./resetPassword")
const validateResetToken = require("./validateResetToken")

router.get("/", function (req, res) {
  res.send("hello world");
});

router.use("/register", register);
router.use("/login", login);
router.use("/auth", auth);
router.use("/logout", logout);
router.use("/update", update);
router.use("/reset-password", reset);
router.use("/forgot-password", forgotPassword);
router.use("/validate-reset-token", validateResetToken);

module.exports = router;
