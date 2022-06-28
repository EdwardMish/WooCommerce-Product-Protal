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
        return res.status(401).json({ success: false, error: true });
      }
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
