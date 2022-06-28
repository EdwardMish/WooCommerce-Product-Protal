const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../../models/user_schema");
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.firstname + " " + req.user.lastname,
  });
});

module.exports = router;
