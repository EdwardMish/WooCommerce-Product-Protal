const express = require("express");
const router = express.Router();
const userModel = require("../../models/user_schema");

router.post("/", (req, res) => {
  userModel.findOne(
    {
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        return res.json({
          success: false,
          message: "Password reset token is invalid or has expired.",
        });
      }
      user.password = req.body.password;
      user.save().then((res) => {
        console.log(res);
      });
      return res.status(200).json({ success: true, user: user });
    }
  );
});

module.exports = router;
