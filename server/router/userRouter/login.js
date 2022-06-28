const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../../models/user_schema");

router.post("/", function (req, res) {
  const userData = req.body;
  userModel.findOne({ email: userData.email }, function (err, user) {
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "email not found" });

    user.comparePassword(userData.password, (err, isMatch) => {
      if (err) return err;
      if (!isMatch)
        return res
          .status(200)
          .json({ success: false, message: "Incorrect Password" });
      user.generateToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        return res
          .cookie("x_auth", userInfo.token)
          .status(200)
          .json({ success: true, ID: userInfo._id });
      });
    });
  });
});

module.exports = router;
